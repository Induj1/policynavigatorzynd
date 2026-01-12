from app.agents.base_agent import BaseAgent
from typing import Dict, List
import json
import logging

logger = logging.getLogger(__name__)

POLICY_PARSER_PROMPT = """You are a Policy Parser Agent specialized in analyzing Indian government welfare scheme documents.

Your role:
1. Parse policy documents and extract structured information
2. Identify eligibility criteria (age, income, location, caste, gender, etc.)
3. Extract benefit details (amount, type, duration)
4. Identify required documents
5. Extract application procedures

Output Format (JSON):
{{
    "scheme_name": "Name of the scheme",
    "department": "Government department",
    "eligibility_criteria": {{
        "age": {{"min": 18, "max": 60}},
        "income": {{"max": 100000, "unit": "annual"}},
        "location": ["state/district"],
        "other": ["additional criteria"]
    }},
    "benefits": {{
        "type": "financial/in-kind/service",
        "amount": "value if applicable",
        "description": "benefit details"
    }},
    "required_documents": ["list of documents"],
    "application_process": "how to apply"
}}

Be precise and extract only factual information from the document."""

class PolicyParserAgent(BaseAgent):
    """Agent specialized in parsing government policy documents"""
    
    def __init__(self):
        super().__init__(
            agent_name="Policy Parser Agent",
            system_prompt=POLICY_PARSER_PROMPT
        )
    
    def parse_scheme_document(self, document_text: str) -> Dict:
        """Parse a scheme document and extract structured information"""
        logger.info(f"Parsing scheme document ({len(document_text)} chars)")
        
        # Add explicit instruction for JSON output
        enhanced_prompt = f"""Parse the following government scheme document and return ONLY a valid JSON object (no markdown formatting, no code blocks):

{document_text}

Return the structured information as a JSON object following the specified format."""
        
        response = self.process(enhanced_prompt)
        logger.info(f"Received response ({len(response)} chars)")
        
        try:
            # Clean response - remove markdown code blocks if present
            cleaned_response = response.strip()
            if cleaned_response.startswith("```json"):
                cleaned_response = cleaned_response[7:]
            if cleaned_response.startswith("```"):
                cleaned_response = cleaned_response[3:]
            if cleaned_response.endswith("```"):
                cleaned_response = cleaned_response[:-3]
            cleaned_response = cleaned_response.strip()
            
            # Try to parse as JSON
            scheme_data = json.loads(cleaned_response)
            logger.info(f"✓ Successfully parsed scheme: {scheme_data.get('scheme_name', 'Unknown')}")
            return scheme_data
        except json.JSONDecodeError as e:
            logger.error(f"JSON parse error: {e}")
            logger.error(f"Response was: {response[:500]}")
            return {
                "scheme_name": "Unknown",
                "raw_response": response,
                "error": f"Failed to parse as JSON: {str(e)}"
            }
    
    def extract_eligibility_rules(self, scheme_data: Dict) -> List[Dict]:
        """Extract eligibility rules in a format for rules engine"""
        eligibility = scheme_data.get("eligibility_criteria", {})
        
        rules = []
        
        # Age rules
        if "age" in eligibility:
            age_rule = eligibility["age"]
            if "min" in age_rule:
                rules.append({
                    "field": "age",
                    "operator": ">=",
                    "value": age_rule["min"]
                })
            if "max" in age_rule:
                rules.append({
                    "field": "age",
                    "operator": "<=",
                    "value": age_rule["max"]
                })
        
        # Income rules
        if "income" in eligibility:
            income_rule = eligibility["income"]
            if "max" in income_rule:
                rules.append({
                    "field": "annual_income",
                    "operator": "<=",
                    "value": income_rule["max"]
                })
        
        # Location rules
        if "location" in eligibility:
            rules.append({
                "field": "location",
                "operator": "in",
                "value": eligibility["location"]
            })
        
        return rules

from app.agents.base_agent import BaseAgent
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

BENEFIT_MATCHER_PROMPT = """You are a Benefit Matcher Agent that discovers and recommends government schemes for citizens.

Your role:
1. Analyze citizen's profile, needs, and situation
2. Match them with relevant government schemes
3. Prioritize schemes by relevance and benefit amount
4. Explain why each scheme is suitable

Output Format (JSON):
{
    "recommendations": [
        {
            "scheme_name": "Name",
            "relevance_score": 0.0-1.0,
            "why_suitable": "explanation",
            "estimated_benefit": "value",
            "priority": "high/medium/low"
        }
    ],
    "total_potential_benefit": "estimated total value",
    "summary": "overall recommendation summary"
}

Consider the citizen's entire situation and be helpful."""

class BenefitMatcherAgent(BaseAgent):
    """Agent specialized in matching citizens with suitable benefits"""
    
    def __init__(self):
        super().__init__(
            agent_name="Benefit Matcher Agent",
            system_prompt=BENEFIT_MATCHER_PROMPT
        )
    
    def find_matching_schemes(self, 
                             citizen_profile: Dict, 
                             available_schemes: List[Dict]) -> Dict:
        """Find and rank schemes suitable for citizen"""
        
        logger.info(f"Finding matches for citizen profile with {len(available_schemes)} available schemes")
        
        # Validate inputs
        if not citizen_profile:
            logger.warning("Empty citizen profile provided")
            return {
                "recommendations": [],
                "summary": "No citizen profile provided",
                "error": "Invalid input"
            }
        
        if not available_schemes:
            logger.warning("No schemes available for matching")
            return {
                "recommendations": [],
                "summary": "No schemes currently available",
                "total_potential_benefit": "0"
            }
        
        # Create matching prompt
        matching_input = f"""
Citizen Profile and Needs:
{self._format_citizen(citizen_profile)}

Available Government Schemes:
{self._format_schemes(available_schemes)}

Recommend the most suitable schemes for this citizen.
"""
        
        try:
            response = self.process(matching_input)
            
            # Try to parse JSON response
            import json
            result = json.loads(response)
            num_recommendations = len(result.get("recommendations", []))
            logger.info(f"✓ Found {num_recommendations} matching schemes")
            return result
        except json.JSONDecodeError as e:
            logger.warning(f"LLM response not valid JSON: {e}")
            # Return a structured response even if parsing fails
            return {
                "recommendations": [],
                "summary": response if response else "Failed to generate recommendations",
                "total_potential_benefit": "Unknown",
                "error": "Failed to parse matching result"
            }
        except Exception as e:
            logger.error(f"Error in find_matching_schemes: {e}")
            return {
                "recommendations": [],
                "summary": f"Error occurred: {str(e)}",
                "total_potential_benefit": "0",
                "error": str(e)
            }
    
    def _format_citizen(self, profile: Dict) -> str:
        """Format citizen profile"""
        lines = []
        for key, value in profile.items():
            lines.append(f"- {key}: {value}")
        return "\n".join(lines)
    
    def _format_schemes(self, schemes: List[Dict]) -> str:
        """Format schemes list"""
        if not schemes:
            return "No schemes available"
        
        lines = []
        for i, scheme in enumerate(schemes, 1):
            lines.append(f"\n{i}. {scheme.get('scheme_name', 'Unknown')}")
            lines.append(f"   Department: {scheme.get('department', 'N/A')}")
            
            # Handle benefits field - can be string or dict
            benefits = scheme.get('benefits', 'N/A')
            if isinstance(benefits, dict):
                benefit_text = benefits.get('description', 'N/A')
            else:
                benefit_text = str(benefits)
            lines.append(f"   Benefit: {benefit_text}")
            
            # Handle eligibility criteria
            eligibility = scheme.get('eligibility_criteria', {})
            if eligibility:
                if isinstance(eligibility, dict):
                    eligibility_text = ', '.join([f"{k}: {v}" for k, v in eligibility.items()])
                else:
                    eligibility_text = str(eligibility)
                lines.append(f"   Eligibility: {eligibility_text}")
        
        return "\n".join(lines)
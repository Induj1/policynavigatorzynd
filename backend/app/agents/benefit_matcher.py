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
        
        logger.info(f"Finding matches for citizen profile")
        
        # Create matching prompt
        matching_input = f"""
Citizen Profile and Needs:
{self._format_citizen(citizen_profile)}

Available Government Schemes:
{self._format_schemes(available_schemes)}

Recommend the most suitable schemes for this citizen.
"""
        
        response = self.process(matching_input)
        
        try:
            import json
            result = json.loads(response)
            num_recommendations = len(result.get("recommendations", []))
            logger.info(f"✓ Found {num_recommendations} matching schemes")
            return result
        except:
            logger.warning("LLM response not valid JSON")
            return {
                "recommendations": [],
                "summary": response,
                "error": "Failed to parse matching result"
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
            lines.append(f"   Benefit: {scheme.get('benefits', {}).get('description', 'N/A')}")
            eligibility = scheme.get('eligibility_criteria', {})
            if eligibility:
                lines.append(f"   Eligibility: {eligibility}")
        
        return "\n".join(lines)
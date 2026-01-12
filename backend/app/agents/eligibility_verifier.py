from app.agents.base_agent import BaseAgent
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

ELIGIBILITY_VERIFIER_PROMPT = """You are an Eligibility Verifier Agent that checks if citizens meet government scheme requirements.

Your role:
1. Compare citizen profile against scheme eligibility criteria
2. Verify each criterion precisely
3. Explain why citizen is eligible or not eligible
4. Provide confidence score

Output Format (JSON):
{
    "is_eligible": true/false,
    "confidence": 0.0-1.0,
    "matched_criteria": ["list of criteria met"],
    "failed_criteria": ["list of criteria not met"],
    "explanation": "detailed explanation",
    "recommendations": ["suggestions if not eligible"]
}

Be strict but fair in your verification."""

class EligibilityVerifierAgent(BaseAgent):
    """Agent specialized in verifying citizen eligibility for schemes"""
    
    def __init__(self):
        super().__init__(
            agent_name="Eligibility Verifier Agent",
            system_prompt=ELIGIBILITY_VERIFIER_PROMPT
        )
    
    def verify_eligibility(self, 
                          citizen_profile: Dict, 
                          scheme_criteria: Dict) -> Dict:
        """Verify if citizen meets scheme eligibility criteria"""
        
        logger.info(f"Verifying eligibility for scheme")
        
        # Create verification prompt
        verification_input = f"""
Citizen Profile:
{self._format_profile(citizen_profile)}

Scheme Eligibility Criteria:
{self._format_criteria(scheme_criteria)}

Verify if this citizen is eligible for the scheme.
"""
        
        response = self.process(verification_input)
        
        try:
            import json
            result = json.loads(response)
            logger.info(f"✓ Verification complete: Eligible={result.get('is_eligible', False)}")
            return result
        except:
            logger.warning("LLM response not valid JSON")
            return {
                "is_eligible": False,
                "confidence": 0.5,
                "explanation": response,
                "error": "Failed to parse verification result"
            }
    
    def _format_profile(self, profile: Dict) -> str:
        """Format citizen profile for LLM"""
        lines = []
        for key, value in profile.items():
            lines.append(f"- {key}: {value}")
        return "\n".join(lines)
    
    def _format_criteria(self, criteria: Dict) -> str:
        """Format eligibility criteria for LLM"""
        if not criteria:
            return "No specific criteria defined"
        
        # Handle if criteria is a string instead of dict
        if isinstance(criteria, str):
            return criteria
        
        if not isinstance(criteria, dict):
            return str(criteria)
        
        lines = []
        for key, value in criteria.items():
            lines.append(f"- {key}: {value}")
        return "\n".join(lines)
    
    def batch_verify(self, 
                    citizen_profile: Dict, 
                    schemes: List[Dict]) -> List[Dict]:
        """Verify eligibility against multiple schemes"""
        results = []
        
        for scheme in schemes:
            result = self.verify_eligibility(
                citizen_profile, 
                scheme.get("eligibility_criteria", {})
            )
            result["scheme_name"] = scheme.get("scheme_name", "Unknown")
            results.append(result)
        
        return results
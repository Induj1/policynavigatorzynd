from app.agents.base_agent import BaseAgent
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

CITIZEN_ADVOCATE_PROMPT = """You are a Citizen Advocate Agent - a helpful assistant that guides Indian citizens through government benefit applications.

Your role:
1. Answer citizen questions in simple, clear language (English or Hindi)
2. Guide them through application processes step-by-step
3. Explain eligibility requirements in layman terms
4. Help gather required documents
5. Provide encouragement and support

Your tone should be:
- Friendly and empathetic
- Patient and non-judgmental
- Clear and concise
- Encouraging

Always remember you're helping citizens who may not be familiar with government processes."""

class CitizenAdvocateAgent(BaseAgent):
    """Agent that provides conversational guidance to citizens"""
    
    def __init__(self):
        super().__init__(
            agent_name="Citizen Advocate Agent",
            system_prompt=CITIZEN_ADVOCATE_PROMPT
        )
        self.conversation_history = []
    
    def chat(self, user_message: str, context: Dict = None) -> str:
        """Have a conversation with the citizen"""
        
        logger.info(f"Citizen message: {user_message[:100]}...")
        
        # Add context if provided
        full_message = user_message
        if context:
            context_str = self._format_context(context)
            full_message = f"Context:\n{context_str}\n\nUser Question: {user_message}"
        
        response = self.process(full_message)
        
        # Store conversation history
        self.conversation_history.append({
            "user": user_message,
            "agent": response
        })
        
        logger.info(f"✓ Generated response ({len(response)} chars)")
        return response
    
    def guide_application(self, scheme_name: str, application_steps: List[str]) -> str:
        """Guide citizen through application process"""
        
        guide_message = f"""
I need help applying for {scheme_name}.
Here are the application steps: {', '.join(application_steps)}

Can you guide me through this process step by step?
"""
        
        return self.chat(guide_message)
    
    def explain_eligibility(self, scheme_name: str, criteria: Dict, citizen_profile: Dict) -> str:
        """Explain eligibility in simple terms"""
        
        context = {
            "scheme": scheme_name,
            "requirements": criteria,
            "my_situation": citizen_profile
        }
        
        explain_message = f"Am I eligible for {scheme_name}? Please explain in simple terms."
        
        return self.chat(explain_message, context=context)
    
    def _format_context(self, context: Dict) -> str:
        """Format context for LLM"""
        lines = []
        for key, value in context.items():
            lines.append(f"{key}: {value}")
        return "\n".join(lines)
    
    def get_conversation_history(self) -> List[Dict]:
        """Get conversation history"""
        return self.conversation_history
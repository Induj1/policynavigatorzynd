from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from app.config import settings
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class BaseAgent:
    """Base class for all specialized agents"""
    
    def __init__(self, agent_name: str, system_prompt: str):
        self.agent_name = agent_name
        self.system_prompt = system_prompt
        
        # Initialize LLM with OpenAI
        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            temperature=settings.LLM_TEMPERATURE,
            api_key=settings.OPENAI_API_KEY
        )
        
        # Create prompt template
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}")
        ])
        
        # Create chain
        self.chain = self.prompt | self.llm
        
        logger.info(f"✓ {agent_name} LLM chain initialized with OpenAI {settings.LLM_MODEL}")
    
    def process(self, input_data: str) -> str:
        """Process input using LLM"""
        try:
            response = self.chain.invoke({"input": input_data})
            return response.content
        except Exception as e:
            logger.error(f"Error in {self.agent_name}: {e}")
            return f"Error: {str(e)}"
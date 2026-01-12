from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    APP_NAME: str = "Policy Navigator"
    DEBUG: bool = True
    
    # Zynd Protocol Settings
    ZYND_REGISTRY_URL: str = "https://registry.zynd.ai"
    ZYND_MQTT_BROKER: str = "mqtt://registry.zynd.ai:1883"
    
    # Agent Seeds
    POLICY_PARSER_SEED: str
    ELIGIBILITY_VERIFIER_SEED: str
    BENEFIT_MATCHER_SEED: str
    CITIZEN_ADVOCATE_SEED: str
    
    # LLM Settings
    OPENAI_API_KEY: str
    LLM_MODEL: str = "gpt-4o-mini"
    LLM_TEMPERATURE: float = 0.0
    
    # Vector Store
    CHROMA_PERSIST_DIR: str = "./data/embeddings"
    
    class Config:
        env_file = ".env"

settings = Settings()
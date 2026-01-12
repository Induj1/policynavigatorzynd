from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging


from app.config import settings


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


app = FastAPI(title=settings.APP_NAME, version="1.0.0")


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global agent instances - DECLARE THESE HERE!
policy_parser = None
eligibility_verifier = None
benefit_matcher = None
citizen_advocate = None


# Include API router
from app.routers import agents
app.include_router(agents.router)


@app.on_event("startup")
async def startup_event():
    """Initialize agents on startup"""
    global policy_parser, eligibility_verifier, benefit_matcher, citizen_advocate
    
    logger.info("Starting Policy Navigator Backend")
    logger.info("=" * 60)
    
    try:
        # Initialize Zynd network clients
        from app.infrastructure.zynd_client import initialize_agents
        initialize_agents()
        logger.info("All agents connected to Zynd Network")
        
        # Initialize specialized agent logic
        from app.agents.policy_parser import PolicyParserAgent
        from app.agents.eligibility_verifier import EligibilityVerifierAgent
        from app.agents.benefit_matcher import BenefitMatcherAgent
        from app.agents.citizen_advocate import CitizenAdvocateAgent
        
        policy_parser = PolicyParserAgent()
        eligibility_verifier = EligibilityVerifierAgent()
        benefit_matcher = BenefitMatcherAgent()
        citizen_advocate = CitizenAdvocateAgent()
        
        # Store in app.state for FastAPI access
        app.state.policy_parser = policy_parser
        app.state.eligibility_verifier = eligibility_verifier
        app.state.benefit_matcher = benefit_matcher
        app.state.citizen_advocate = citizen_advocate
        
        logger.info("✓ All agent LLM chains initialized")
        
    except Exception as e:
        logger.error(f"Failed to initialize agents: {e}")
        logger.info("Running in degraded mode")
    
    logger.info("=" * 60)
    logger.info(f"✓ Server ready at http://localhost:8000")
    logger.info(f"✓ API docs at http://localhost:8000/docs")
    logger.info("=" * 60)


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "status": "running",
        "message": "Policy Navigator Backend API",
        "version": "1.0.0"
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/agents/status")
async def agents_status():
    """Get status of all Zynd agents"""
    try:
        from app.infrastructure.zynd_client import (
            get_policy_parser,
            get_eligibility_verifier,
            get_benefit_matcher,
            get_citizen_advocate
        )
        
        return {
            "policy_parser": get_policy_parser().get_status(),
            "eligibility_verifier": get_eligibility_verifier().get_status(),
            "benefit_matcher": get_benefit_matcher().get_status(),
            "citizen_advocate": get_citizen_advocate().get_status()
        }
    except Exception as e:
        return {
            "error": str(e),
            "message": "Agents not initialized yet"
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
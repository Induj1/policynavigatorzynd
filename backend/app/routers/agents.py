from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Dict, List, Optional
import logging
from app.services.agent_communication import AgentCommunicationService


logger = logging.getLogger(__name__)


router = APIRouter(prefix="/api", tags=["agents"])


# Request/Response models
class ParseSchemeRequest(BaseModel):
    document_text: str


class VerifyEligibilityRequest(BaseModel):
    citizen_profile: Dict
    scheme_criteria: Dict


class FindBenefitsRequest(BaseModel):
    citizen_profile: Dict
    available_schemes: List[Dict]


class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict] = None


# Endpoints
@router.post("/parse-scheme")
async def parse_scheme(request: ParseSchemeRequest, req: Request):
    """Parse a government scheme document"""
    logger.info(f"📥 Received parse-scheme request ({len(request.document_text)} chars)")
    try:
        policy_parser = req.app.state.policy_parser
        
        if policy_parser is None:
            logger.error("Policy parser agent not initialized")
            raise HTTPException(status_code=503, detail="Agent not initialized")
        
        result = policy_parser.parse_scheme_document(request.document_text)
        logger.info(f"📤 Returning parse-scheme response")
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        logger.error(f"❌ Error parsing scheme: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/verify-eligibility")
async def verify_eligibility(request: VerifyEligibilityRequest, req: Request):
    """Verify citizen eligibility for a scheme"""
    try:
        eligibility_verifier = req.app.state.eligibility_verifier
        
        if eligibility_verifier is None:
            raise HTTPException(status_code=503, detail="Agent not initialized")
        
        result = eligibility_verifier.verify_eligibility(
            request.citizen_profile,
            request.scheme_criteria
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        logger.error(f"Error verifying eligibility: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/find-benefits")
async def find_benefits(request: FindBenefitsRequest, req: Request):
    """Find matching benefits for a citizen"""
    try:
        benefit_matcher = req.app.state.benefit_matcher
        
        if benefit_matcher is None:
            raise HTTPException(status_code=503, detail="Agent not initialized")
        
        result = benefit_matcher.find_matching_schemes(
            request.citizen_profile,
            request.available_schemes
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        logger.error(f"Error finding benefits: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat")
async def chat_with_agent(request: ChatRequest, req: Request):
    """Chat with the Citizen Advocate Agent"""
    try:
        citizen_advocate = req.app.state.citizen_advocate
        
        if citizen_advocate is None:
            raise HTTPException(status_code=503, detail="Agent not initialized")
        
        response = citizen_advocate.chat(
            request.message,
            context=request.context
        )
        return {
            "success": True,
            "response": response
        }
    except Exception as e:
        logger.error(f"Error in chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/agents/status")
async def get_agents_status(req: Request):
    """Get status of all Zynd agents and their communication network"""
    try:
        # Get individual agent status
        individual_status = {
            "policy_parser": req.app.state.policy_parser.get_status() if hasattr(req.app.state, 'policy_parser') else None,
            "eligibility_verifier": req.app.state.eligibility_verifier.get_status() if hasattr(req.app.state, 'eligibility_verifier') else None,
            "benefit_matcher": req.app.state.benefit_matcher.get_status() if hasattr(req.app.state, 'benefit_matcher') else None,
            "citizen_advocate": req.app.state.citizen_advocate.get_status() if hasattr(req.app.state, 'citizen_advocate') else None
        }
        
        # Get network communication status
        network_status = AgentCommunicationService.get_agent_network_status()
        
        return {
            "agents": individual_status,
            "network": network_status,
            "total_agents": 4,
            "all_connected": all(status is not None for status in individual_status.values())
        }
    except Exception as e:
        logger.error(f"Error getting status: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/agents/test-communication")
async def test_agent_communication(req: Request):
    """Test communication between all 4 agents"""
    try:
        logger.info("🧪 Testing agent-to-agent communication...")
        
        # Run a test workflow involving all agents
        result = AgentCommunicationService.full_application_workflow(
            document_text="Sample government scheme for housing assistance",
            citizen_profile={"age": 35, "income": 50000, "location": "urban"}
        )
        
        logger.info("✓ Communication test completed")
        
        return {
            "success": True,
            "test_result": result,
            "message": "All 4 agents communicated successfully!"
        }
    except Exception as e:
        logger.error(f"Communication test failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
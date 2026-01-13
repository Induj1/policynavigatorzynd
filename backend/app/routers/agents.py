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
    """Find matching benefits for a citizen using OpenAI to match with real Indian government schemes"""
    try:
        import openai
        import os
        import json
        
        # Get OpenAI API key from environment
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            raise HTTPException(status_code=503, detail="OpenAI API key not configured")
        
        # Real Indian Government Schemes Database
        real_indian_schemes = [
            {
                "scheme_name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
                "department": "Ministry of Agriculture & Farmers Welfare",
                "benefits": "₹6,000 per year in 3 installments",
                "eligibility": "Small and marginal farmers with cultivable land up to 2 hectares",
                "target_group": "Farmers, Agricultural workers",
                "age_limit": "No age limit",
                "income_limit": "No income limit for farmers",
                "documents": "Land records, Aadhaar card, Bank account"
            },
            {
                "scheme_name": "Ayushman Bharat - PM-JAY",
                "department": "Ministry of Health and Family Welfare",
                "benefits": "Health insurance coverage up to ₹5 lakh per family per year",
                "eligibility": "Families identified through SECC 2011 data, economically vulnerable",
                "target_group": "Poor and vulnerable families",
                "age_limit": "No age limit",
                "income_limit": "Based on SECC deprivation criteria",
                "documents": "Aadhaar card, Ration card, SECC verification"
            },
            {
                "scheme_name": "PM Mudra Yojana",
                "department": "Ministry of Finance",
                "benefits": "Loans up to ₹10 lakh for micro-enterprises",
                "eligibility": "Small business owners, entrepreneurs, self-employed",
                "target_group": "Entrepreneurs, Small businesses",
                "age_limit": "18 years and above",
                "income_limit": "For income-generating activities",
                "documents": "Business plan, Identity proof, Address proof, Bank account"
            },
            {
                "scheme_name": "National Scholarship Portal (NSP)",
                "department": "Ministry of Education",
                "benefits": "₹10,000 to ₹1,00,000 per year depending on category and course",
                "eligibility": "Students from SC/ST/OBC/Minority communities, merit-based",
                "target_group": "Students pursuing higher education",
                "age_limit": "Varies by scholarship (typically under 30)",
                "income_limit": "Family income below ₹2.5 lakh to ₹8 lakh (varies)",
                "documents": "Educational certificates, Income certificate, Caste certificate, Bank account"
            },
            {
                "scheme_name": "PM Awas Yojana (Urban & Rural)",
                "department": "Ministry of Housing and Urban Affairs",
                "benefits": "Subsidy on home loans, direct assistance for house construction (₹1.5-2.5 lakh)",
                "eligibility": "Economically Weaker Section (EWS), Low Income Group (LIG), homeless",
                "target_group": "Poor families, First-time homebuyers",
                "age_limit": "21-70 years for credit-linked subsidy",
                "income_limit": "EWS: up to ₹3 lakh/year, LIG: ₹3-6 lakh/year, MIG: ₹6-18 lakh/year",
                "documents": "Income certificate, Identity proof, Property documents, Bank account"
            },
            {
                "scheme_name": "Beti Bachao Beti Padhao",
                "department": "Ministry of Women and Child Development",
                "benefits": "Sukanya Samriddhi Account with attractive interest rates, girl child welfare",
                "eligibility": "Girl child under 10 years of age",
                "target_group": "Girl children and their parents",
                "age_limit": "Account for girls below 10 years",
                "income_limit": "No income limit",
                "documents": "Birth certificate of girl child, Parents' identity and address proof"
            },
            {
                "scheme_name": "PM Vishwakarma Yojana",
                "department": "Ministry of Micro, Small & Medium Enterprises",
                "benefits": "₹10,000-15,000 toolkit incentive, skill training, collateral-free loans up to ₹3 lakh",
                "eligibility": "Traditional artisans and craftspeople (carpenters, goldsmiths, blacksmiths, etc.)",
                "target_group": "Artisans, Craftspeople, Traditional workers",
                "age_limit": "18 years and above",
                "income_limit": "No specific limit for traditional workers",
                "documents": "Identity proof, Proof of traditional work, Bank account"
            },
            {
                "scheme_name": "National Pension Scheme (NPS) - APY",
                "department": "Pension Fund Regulatory and Development Authority",
                "benefits": "Guaranteed pension of ₹1,000-5,000 per month after 60 years",
                "eligibility": "Indian citizens aged 18-40 years, unorganized sector workers",
                "target_group": "Unorganized sector workers, Self-employed",
                "age_limit": "18-40 years at enrollment",
                "income_limit": "Primarily for those not covered under statutory social security",
                "documents": "Aadhaar card, Mobile number, Bank account"
            },
            {
                "scheme_name": "PM Kaushal Vikas Yojana (PMKVY)",
                "department": "Ministry of Skill Development and Entrepreneurship",
                "benefits": "Free skill training, ₹8,000 average reward on certification",
                "eligibility": "Youth seeking employment, school/college dropouts",
                "target_group": "Youth (15-45 years), Job seekers",
                "age_limit": "Primarily 15-45 years",
                "income_limit": "No specific limit",
                "documents": "Aadhaar card, Educational certificates, Bank account"
            },
            {
                "scheme_name": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
                "department": "Ministry of Rural Development",
                "benefits": "100 days of guaranteed wage employment per year, ₹200-300 per day",
                "eligibility": "Adult members of rural households willing to do unskilled manual work",
                "target_group": "Rural households, Unemployed rural workers",
                "age_limit": "18 years and above",
                "income_limit": "No income limit",
                "documents": "Job card, Aadhaar card, Bank account"
            },
            {
                "scheme_name": "PM Ujjwala Yojana",
                "department": "Ministry of Petroleum and Natural Gas",
                "benefits": "Free LPG connection with ₹1,600 assistance",
                "eligibility": "Women from BPL households, SECC 2011 beneficiaries",
                "target_group": "BPL women, Poor households",
                "age_limit": "Adult women (18+)",
                "income_limit": "BPL families",
                "documents": "BPL ration card, Aadhaar card, Address proof, Bank account"
            },
            {
                "scheme_name": "PM Fasal Bima Yojana",
                "department": "Ministry of Agriculture & Farmers Welfare",
                "benefits": "Crop insurance - compensation for crop loss/damage",
                "eligibility": "Farmers - owner cultivators and tenant farmers",
                "target_group": "Farmers",
                "age_limit": "No age limit",
                "income_limit": "No income limit",
                "documents": "Land records, Sowing certificate, Aadhaar card, Bank account"
            },
            {
                "scheme_name": "Stand Up India Scheme",
                "department": "Ministry of Finance",
                "benefits": "Loans between ₹10 lakh to ₹1 crore for SC/ST/Women entrepreneurs",
                "eligibility": "SC/ST and women entrepreneurs for greenfield enterprises",
                "target_group": "SC/ST entrepreneurs, Women entrepreneurs",
                "age_limit": "18 years and above",
                "income_limit": "For setting up new enterprises",
                "documents": "Business plan, Identity proof, Category certificate, Bank account"
            },
            {
                "scheme_name": "PM Matru Vandana Yojana",
                "department": "Ministry of Women and Child Development",
                "benefits": "₹5,000 cash incentive for first living child",
                "eligibility": "Pregnant and lactating women (first child)",
                "target_group": "Pregnant women, New mothers",
                "age_limit": "Pregnant women 19 years and above",
                "income_limit": "All pregnant women except government employees",
                "documents": "MCP card, Aadhaar card, Bank account, Child birth certificate"
            },
            {
                "scheme_name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
                "department": "Ministry of Finance",
                "benefits": "₹2 lakh life insurance cover for ₹436/year premium",
                "eligibility": "18-50 years age group with savings bank account",
                "target_group": "Bank account holders",
                "age_limit": "18-50 years (coverage up to 55)",
                "income_limit": "No income limit",
                "documents": "Savings bank account, Aadhaar card, Consent form"
            }
        ]
        
        # Create comprehensive prompt for OpenAI
        citizen_info = "\n".join([f"- {key}: {value}" for key, value in request.citizen_profile.items()])
        
        schemes_info = ""
        for idx, scheme in enumerate(real_indian_schemes, 1):
            schemes_info += f"\n{idx}. {scheme['scheme_name']}\n"
            schemes_info += f"   Department: {scheme['department']}\n"
            schemes_info += f"   Benefits: {scheme['benefits']}\n"
            schemes_info += f"   Eligibility: {scheme['eligibility']}\n"
            schemes_info += f"   Target Group: {scheme['target_group']}\n"
            schemes_info += f"   Age Limit: {scheme['age_limit']}\n"
            schemes_info += f"   Income Limit: {scheme['income_limit']}\n"
            schemes_info += f"   Documents: {scheme['documents']}\n"
        
        prompt = f"""You are an expert advisor for Indian Government welfare schemes. Analyze the citizen's profile and recommend the most suitable schemes from the available options.

Citizen Profile:
{citizen_info}

Available Government Schemes:
{schemes_info}

Please analyze the citizen's profile and provide recommendations in the following JSON format:
{{
    "recommendations": [
        {{
            "scheme_name": "Full scheme name",
            "relevance_score": 0.95,
            "why_suitable": "Detailed explanation of why this scheme is suitable for this citizen",
            "estimated_benefit": "Specific benefit amount or description",
            "priority": "high/medium/low",
            "application_process": "Brief steps to apply"
        }}
    ],
    "total_potential_benefit": "Estimated total monetary benefit",
    "summary": "Overall recommendation summary highlighting top 2-3 schemes"
}}

Rules:
1. Only recommend schemes where the citizen genuinely matches the eligibility criteria
2. Rank by relevance (most relevant first)
3. Provide specific, actionable advice
4. Calculate realistic benefit amounts
5. Consider the citizen's complete profile (age, income, occupation, location, category, education)
6. If citizen is a farmer, prioritize agricultural schemes
7. If citizen has low income, prioritize welfare and subsidy schemes
8. If citizen is a student, prioritize education schemes
9. If citizen is an entrepreneur, prioritize business loan schemes
"""
        
        # Call OpenAI API
        from openai import OpenAI
        client = OpenAI(api_key=openai_api_key)
        
        logger.info(f"Calling OpenAI for benefit matching with {len(real_indian_schemes)} schemes")
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert Indian Government welfare schemes advisor. Always respond with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=2000
        )
        
        # Parse response
        ai_response = response.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if ai_response.startswith("```json"):
            ai_response = ai_response[7:]
        if ai_response.startswith("```"):
            ai_response = ai_response[3:]
        if ai_response.endswith("```"):
            ai_response = ai_response[:-3]
        ai_response = ai_response.strip()
        
        result = json.loads(ai_response)
        
        logger.info(f"✓ OpenAI returned {len(result.get('recommendations', []))} recommendations")
        
        return {
            "success": True,
            "data": result
        }
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse OpenAI response as JSON: {e}")
        return {
            "success": False,
            "error": "Failed to parse AI response",
            "data": {
                "recommendations": [],
                "summary": "Error processing recommendations. Please try again.",
                "total_potential_benefit": "0"
            }
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
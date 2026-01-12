"""Test OpenAI API connectivity"""
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
print(f"API Key loaded: {api_key[:30]}..." if api_key else "NO API KEY FOUND")

if not api_key:
    print("ERROR: OPENAI_API_KEY not found in .env file")
    exit(1)

try:
    # Test with LangChain (same as the app uses)
    print("\nTesting OpenAI with LangChain...")
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.0,
        api_key=api_key
    )
    
    response = llm.invoke("Say hello in one word")
    print(f"✓ SUCCESS! Response: {response.content}")
    
except Exception as e:
    print(f"✗ FAILED: {e}")
    import traceback
    traceback.print_exc()

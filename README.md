# Policy Navigator

AI-powered government scheme navigator helping citizens discover and access government benefits.

## 🚀 Features

- **AI Chat Assistant** - Get personalized help with government schemes
- **Scheme Parser** - Understand complex policy documents
- **Eligibility Verification** - Check if you qualify for benefits
- **Benefit Matcher** - Discover all schemes you're eligible for
- **Multi-language Support** - English and Hindi
- **Voice Search** - Accessibility-first design
- **Document Upload** - Verify eligibility with documents
- **Video Tutorials** - Learn how to apply

## 📦 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- React Hot Toast

### Backend
- FastAPI
- Python 3.12
- Zynd AI Agents (MQTT)
- OpenAI API

## 🛠️ Installation

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🌍 Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_key
ZYND_MQTT_HOST=registry.zynd.ai
ZYND_MQTT_PORT=1883
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## 📱 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `cd frontend && npm install && npm run build`
3. Set output directory: `frontend/dist`

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd backend && pip install -r requirements.txt`
4. Set start command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## 🎯 Usage

1. Visit the home page
2. Browse schemes by category
3. Use search or voice input
4. Check eligibility for schemes
5. Chat with AI assistant for personalized help
6. Track application status

## � Creating Agents from Zynd Dashboard

Before implementing the agents, you need to create them on the Zynd Dashboard and obtain their credentials.

### Steps to Create Agents:

1. **Visit Zynd Dashboard**
   - Go to [https://registry.zynd.ai](https://registry.zynd.ai)
   - Sign up or log in to your account

2. **Create New Agent**
   - Click on "Create New Agent"
   - Fill in the agent details:
     - **Agent Name**: (e.g., P3AI_AGENT, POLICY_PARSER, etc.)
     - **Description**: Brief description of agent's purpose
     - **Capabilities**: Define what the agent can do

3. **Generate Credentials**
   - After creation, the dashboard will generate:
     - **DID (Decentralized Identifier)**: Unique agent identity
     - **Credential File**: JSON file containing agent's identity
     - **Secret Seed**: Private key for agent authentication

4. **Download Credentials**
   - Download the credential JSON file
   - Save it in your project: `backend/credentials/<agent_name>_credential.json`
   - Copy the secret seed to your `.env` file

5. **Repeat for All Agents**
   - Create all 5 agents:
     1. P3AI_AGENT
     2. POLICY_PARSER
     3. ELIGIBILITY_VERIFIER
     4. BENEFIT_MATCHER
     5. CITIZEN_ADVOCATE

6. **Update Environment Variables**
   - Add all agent seeds to `.env`:
   ```
   P3AI_AGENT_SEED=<your_generated_seed>
   POLICY_PARSER_SEED=<your_generated_seed>
   ELIGIBILITY_VERIFIER_SEED=<your_generated_seed>
   BENEFIT_MATCHER_SEED=<your_generated_seed>
   CITIZEN_ADVOCATE_SEED=<your_generated_seed>
   ```

7. **Verify Agent Registration**
   - Check the dashboard to ensure all agents are registered
   - Verify DID assignments
   - Test connectivity using Zynd CLI (optional)

### Important Notes:
- ⚠️ **Keep secret seeds secure** - Never commit them to version control
- 📁 Store credential files in `backend/credentials/` directory
- 🔐 Each agent must have unique credentials
- 🌐 Ensure agents are registered before running the application

## �🚀 Step-by-Step: Building Each Agent

### 1️⃣ P3AI_AGENT (Intent Orchestrator & Network Core)

**Purpose:**
Acts as the entry point for all user requests and serves as the trust and communication backbone of the system.

**Steps:**
1. Accept user input (query / action)
2. Convert input into a structured intent
3. Register each agent with a Decentralized Identity (DID)
4. Maintain a capability registry for agent discovery
5. Authenticate agents before every interaction
6. Verify Verifiable Credentials (VCs)
7. Route encrypted messages between agents
8. Maintain audit and governance logs
9. Block direct agent-to-agent communication

📌 **This agent must be implemented before any other agent.**
⚠️ **The P3AI_AGENT never makes decisions and never accesses data directly.**

### 2️⃣ POLICY_PARSER (Policy Intelligence Agent)

**Purpose:**
Interprets and validates policy or scheme information.

**Steps:**
1. Load verified policy documents
2. Perform RAG-based interpretation
3. Ground responses strictly to trusted sources
4. Generate signed policy interpretations (VCₚ)
5. Return results via the Network Agent

📌 **Prevents hallucinations through source verification.**

### 3️⃣ ELIGIBILITY_VERIFIER

**Purpose:**
Evaluates eligibility and issues cryptographic proof.

**Steps:**
1. Receive eligibility request via Network Agent
2. Validate required attributes using privacy-preserving checks
3. Apply formal eligibility rules
4. Issue a Verifiable Credential (VCₑ) indicating eligibility status
5. Send signed credential back to the Network Agent

📌 **Only this agent is allowed to issue eligibility credentials.**

### 4️⃣ BENEFIT_MATCHER (Aggregation & Reasoning)

**Purpose:**
Forms collective intelligence by synthesizing agent outputs.

**Steps:**
1. Request verified credentials from Network Agent
2. Aggregate eligibility and policy credentials
3. Perform trust-weighted ranking
4. Generate explainable recommendations
5. Output structured decisions for explanation

📌 **Consumes only verified and signed inputs.**

### 5️⃣ CITIZEN_ADVOCATE (Human Interface)

**Purpose:**
Bridges human language and machine reasoning.

**Steps:**
1. Receive structured responses from the Network Agent
2. Translate agent outputs into human-readable explanations
3. Handle multilingual or contextual phrasing
4. Provide explainability without altering decisions
5. Return final responses to the user

⚠️ **This agent cannot request raw data or issue credentials.**

### 🔐 Communication Rules (Critical)

- **Agents never communicate directly**
- All messages are:
  - DID-authenticated
  - Encrypted
  - Credential-verified
- All interactions are auditable
- Trust enforcement is decentralized

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

MIT License

## 🙏 Acknowledgments

- Digital India Initiative
- Government of India
- Zynd AI Platform
- OpenAI

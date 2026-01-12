# Policy Navigator Frontend

Beautiful, modern React frontend for the Policy Navigator AI-powered government scheme assistant.

## Features

- 🤖 **AI Chat Assistant** - Interactive chat with Citizen Advocate agent
- 📄 **Scheme Parser** - Extract structured data from policy documents
- ✅ **Eligibility Verifier** - Automated eligibility checking
- 🎯 **Benefit Matcher** - Smart scheme recommendations

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React Icons
- React Hot Toast

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run on [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── PolicyParser/    # Scheme parsing feature
│   │   ├── EligibilityVerifier/  # Eligibility checking
│   │   ├── BenefitMatcher/  # Benefit matching
│   │   └── ChatAdvocate/    # AI chat interface
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The frontend communicates with the backend API at `http://localhost:8000`. All API calls are handled through the centralized `services/api.js` module.

## Features in Detail

### 1. Chat Assistant
- Real-time AI-powered conversations
- Context-aware responses
- Quick question templates
- Message history

### 2. Policy Parser
- Parse government scheme documents
- Extract eligibility criteria
- Identify benefits and application process
- Structured output display

### 3. Eligibility Verifier
- Input citizen profile
- Define scheme criteria
- AI-powered verification
- Detailed reasoning for decisions

### 4. Benefit Matcher
- Profile-based scheme matching
- Support for multiple schemes
- Match scoring
- Personalized recommendations

## Contributing

This is part of the Policy Navigator project powered by Zynd AI Network.

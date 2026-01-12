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

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

MIT License

## 🙏 Acknowledgments

- Digital India Initiative
- Government of India
- Zynd AI Platform
- OpenAI

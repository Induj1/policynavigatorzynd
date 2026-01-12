# Deployment Guide for Policy Navigator

## 📋 Prerequisites
- GitHub account
- Vercel account (free tier works)
- Render account (free tier works)
- Your OpenAI API key

---

## 🐙 Step 1: Push to GitHub

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `policy-navigator`
3. Description: "AI-powered government scheme navigator"
4. Set to **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Push your code:
```bash
cd "C:\Users\induj\Downloads\policy-navigator (1)\policy-navigator"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/policy-navigator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Deploy Frontend on Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com/
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `policy-navigator` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: Click "Edit" → Select **`frontend`**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
   (You'll update this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your frontend URL will be: `https://policy-navigator-xyz.vercel.app`

### Method 2: Using Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel login
vercel --prod
```

---

## ⚙️ Step 3: Deploy Backend on Render

### Using Render Dashboard:

1. **Go to Render**
   - Visit https://render.com/
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your `policy-navigator` repository
   - Click "Connect"

3. **Configure Service**
   - Name: `policy-navigator-backend`
   - Region: **Oregon** (or closest to you)
   - Branch: `main`
   - Root Directory: Leave blank
   - Runtime: **Python 3**
   - Build Command: 
     ```
     cd backend && pip install -r requirements.txt
     ```
   - Start Command:
     ```
     cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```

4. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   OPENAI_API_KEY = sk-proj-your-actual-openai-key
   ZYND_MQTT_HOST = registry.zynd.ai
   ZYND_MQTT_PORT = 1883
   PYTHON_VERSION = 3.12.0
   ```

5. **Deploy**
   - Select **Free** instance type
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - Your backend URL will be: `https://policy-navigator-backend.onrender.com`

---

## 🔗 Step 4: Connect Frontend to Backend

1. **Copy Backend URL**
   - From Render dashboard, copy your backend URL
   - Example: `https://policy-navigator-backend.onrender.com`

2. **Update Vercel Environment Variable**
   - Go to Vercel Dashboard → Your Project
   - Settings → Environment Variables
   - Edit `VITE_API_URL` to your Render backend URL
   - Click "Save"

3. **Redeploy Frontend**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## ✅ Step 5: Verify Deployment

### Test Frontend:
1. Visit your Vercel URL: `https://policy-navigator-xyz.vercel.app`
2. Check if:
   - Home page loads
   - Search works
   - Categories display
   - Language switcher works
   - Navigation tabs work

### Test Backend:
1. Visit: `https://policy-navigator-backend.onrender.com/docs`
2. You should see FastAPI Swagger documentation
3. Test health endpoint: `https://policy-navigator-backend.onrender.com/health`

### Test Integration:
1. Go to frontend → "Help Chat" tab
2. Try sending a message
3. System status should show "Online" if backend is connected

---

## 🐛 Troubleshooting

### Frontend Issues:
- **Build fails**: Check if all dependencies are in `package.json`
- **White screen**: Check browser console for CORS errors
- **API not connecting**: Verify `VITE_API_URL` environment variable

### Backend Issues:
- **503 Service Unavailable**: Wait 1-2 minutes (Render free tier cold start)
- **Application Error**: Check Render logs for Python errors
- **CORS errors**: Ensure CORS is configured in `app/main.py`

### Common Fixes:
```python
# In backend/app/main.py, ensure CORS is configured:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 Monitoring & Logs

### Vercel Logs:
- Dashboard → Your Project → Deployments → Click deployment → "Logs"

### Render Logs:
- Dashboard → Your Service → "Logs" tab (real-time)

---

## 🔄 Future Updates

### Update Frontend:
```bash
git add .
git commit -m "Updated frontend"
git push origin main
```
Vercel auto-deploys on push!

### Update Backend:
```bash
git add .
git commit -m "Updated backend"
git push origin main
```
Render auto-deploys on push!

---

## 💰 Cost Estimate

- **GitHub**: Free
- **Vercel**: Free tier (100GB bandwidth/month)
- **Render**: Free tier (750 hours/month, sleeps after inactivity)
- **Total Monthly Cost**: $0 (with free tiers)

### Upgrade Options:
- Vercel Pro: $20/month (better performance, analytics)
- Render Starter: $7/month (no sleep, faster cold starts)

---

## 🎉 Your URLs

After deployment, save these:

```
Frontend: https://policy-navigator-xyz.vercel.app
Backend API: https://policy-navigator-backend.onrender.com
API Docs: https://policy-navigator-backend.onrender.com/docs
GitHub: https://github.com/YOUR_USERNAME/policy-navigator
```

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/

Good luck with your deployment! 🚀

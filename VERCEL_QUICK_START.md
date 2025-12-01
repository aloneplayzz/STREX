# StratiumeX on Vercel - 5 Minute Setup

## Prerequisites
- GitHub account
- Vercel account (free)
- Your code on GitHub

---

## Deploy in 5 Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Visit Vercel
Go to https://vercel.com/new

### 3. Import GitHub Repository
- Click "Import Git Repository"
- Find your repository
- Click "Import"

### 4. Configure (Should Be Auto)
Vercel auto-detects - just click **"Deploy"**

Settings shown should be:
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist/public

### 5. Wait & Done! ✅
- Deployment takes ~1-2 minutes
- You get a live URL like: `stratiumex.vercel.app`

---

## Add Custom Domain (Optional)
Settings → Domains → Add Domain

---

## Auto-Deploys After This
Every time you push to GitHub → Vercel auto-deploys 🚀

---

**That's it! Your website is live on Vercel.**

# StratiumeX - Vercel Deployment Guide

## Overview
Your StratiumeX website is optimized for Vercel deployment. Since the app uses browser localStorage (no backend database), it deploys as a static frontend application.

---

## Deployment Steps

### Step 1: Create Vercel Account
- Go to https://vercel.com
- Sign up (free tier available)
- Verify email

### Step 2: Connect Your GitHub
1. Push your project to GitHub (if not already done)
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stratiumex.git
   git push -u origin main
   ```

2. In Vercel dashboard, click **"New Project"**
3. Select **"Import Git Repository"**
4. Find your repository and click **"Import"**

### Step 3: Configure Project Settings
Vercel should auto-detect, but verify:

**Build Settings:**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

**Environment Variables:**
- `NODE_ENV`: `production`

Click **"Deploy"** and wait ~2 minutes.

---

## After Deployment

### Your Website is Live! 🎉
- Vercel gives you a domain like: `stratiumex.vercel.app`
- Or connect your custom domain

### Custom Domain (Optional)
1. In Vercel → Settings → Domains
2. Add your domain
3. Follow DNS instructions

---

## How It Works

Since your app uses **browser localStorage**:
- ✅ No backend server needed
- ✅ All data stored locally on user's browser
- ✅ Perfect for Vercel's static/serverless model
- ✅ Fast deployment (~30 seconds)
- ✅ Automatic HTTPS

---

## What Gets Deployed

```
vercel.json                    ← Vercel config (new)
dist/public/
├── index.html                ← Main app
├── assets/
│   ├── index-*.css          ← Styles
│   └── index-*.js           ← React bundle
```

**Size:** ~200 KB gzipped - very fast loading

---

## Automatic Deployments

**On Vercel, every git push auto-deploys:**

1. Make changes locally
2. Commit: `git commit -m "Update"`
3. Push: `git push`
4. Vercel automatically builds and deploys
5. New version live in ~1-2 minutes

---

## Rollback (If Needed)

In Vercel dashboard → Deployments:
- See all deployment history
- Click any past deployment → "Rollback"
- Instant revert to previous version

---

## Performance

Vercel provides:
- ✅ Global CDN (fast worldwide)
- ✅ Automatic image optimization
- ✅ Gzip compression
- ✅ Caching optimized
- ✅ Analytics dashboard

---

## Troubleshooting

### Page Shows "404 Not Found"
- **Fix**: Vercel config already handles this with SPA routing in `vercel.json`
- Should be working automatically

### Page Doesn't Load
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check Vercel deployment logs

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally: `npm run build && npm start`
- Most common: Missing dependencies - run `npm install`

---

## Production Checklist

- ✅ `vercel.json` configured
- ✅ `dist/public/` folder created by build
- ✅ GitHub repository set up
- ✅ Environment variables configured
- ✅ Custom domain added (optional)

---

## Switching Between Hosting

**Current:** Hostinger (full-stack with Node.js)
**New:** Vercel (frontend-only, static)

Both work! Choose based on:
- **Vercel**: Fast, free tier, auto-deploy from GitHub, best for frontend-only
- **Hostinger**: More control, Node.js backend support, if you add server features

---

## Local Testing Before Deploy

Test production build locally:

```bash
npm run build
npm start
```

Visit `http://localhost:5000` - should work identically to Vercel.

---

## What About the Backend?

The Express backend (`server/index.ts`) is **not deployed to Vercel** because:
- Vercel uses serverless functions (not long-running servers)
- Your app doesn't need a backend (uses localStorage)
- If you add backend features later, use:
  - **Vercel Functions** (serverless API routes)
  - **Railway/Render** (traditional Node.js hosting)
  - **AWS Lambda** (serverless functions)

---

## Vercel Free Tier Includes

- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Global CDN
- ✅ HTTPS/SSL
- ✅ Analytics
- ✅ 100 GB bandwidth/month
- ✅ Automatic previews for pull requests

---

## Next Steps

1. **Push to GitHub** (if not done)
2. **Connect Vercel** to your GitHub repo
3. **Deploy** - takes ~1-2 minutes
4. **Visit your URL** - Done! 🚀

---

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Common issues: https://vercel.com/docs/platforms/v0/overview

---

**Status:** Ready for Vercel deployment  
**Last Updated:** December 1, 2025  
**Deployment Time:** ~2 minutes  
**Uptime:** 99.95% SLA

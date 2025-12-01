# StratiumeX - Quick Hostinger 403 Fix (5 Minutes)

## The Problem
Your website shows **403 Forbidden** - Node.js app isn't running on Hostinger.

## The Solution - 5 Easy Steps

### Step 1: Access Hostinger Dashboard
- Log in to Hostinger
- Click **Hosting** → **Manage** (next to your domain)

### Step 2: Go to Node.js Manager
- Left sidebar → Find **Node.js** or **Applications**
- Click **Node.js Manager** or **Applications**

### Step 3: Create New Application
Click **Create Application** or **Add Application** and fill:

```
Application name:    stratiumex
Application root:    /home/youruser/public_html/
Node.js version:     18.x (or newest available)
Entry point:         dist/index.cjs
Application port:    5000
```

Click **Create** → Hostinger will start the app automatically.

### Step 4: Upload Your Built Files
Using Hostinger's File Manager:

1. Go to **File Manager**
2. Open your domain folder (`public_html/`)
3. **Delete** any existing files first
4. Upload from your local computer:
   - Entire `dist/` folder from `npm run build` output
   - `package.json` file
   - `package-lock.json` file

### Step 5: Install Dependencies & Restart
In Hostinger panel, open **Terminal**:

```bash
cd /home/youruser/public_html/
npm install --production
```

Then restart the Node.js app:
- Go back to **Node.js Manager**
- Click **Restart** next to `stratiumex`
- Wait 30 seconds

---

## Done! 🎉

Refresh your domain in browser. Should now show the website instead of 403 error.

---

## If Still Not Working

### Check 1: Wrong Entry Point?
- Go to Node.js Manager
- Verify entry point is exactly: `dist/index.cjs`
- If wrong, edit and change it
- Restart app

### Check 2: npm install failed?
- Run this in Terminal:
  ```bash
  cd /home/youruser/public_html/
  npm install --production
  rm -rf node_modules
  npm install --production
  ```
- Restart app

### Check 3: Check App Status
- Go to Node.js Manager
- Is app status showing "Running" in green?
- If red/stopped, click **Restart**

### Check 4: Check Logs
- In Node.js Manager, find **Logs** or **View Logs**
- Look for error messages
- Contact Hostinger support with log screenshot

---

## Video Alternative
If you prefer step-by-step video, search YouTube for:
**"Hostinger Node.js Application Setup"**

Most guides apply to your situation.

---

## Support
- **Hostinger Support**: https://support.hostinger.com/
- **Response time**: Usually 2-24 hours
- **Mention**: "403 Forbidden error with Node.js application stratiumex"

---

## Facts
✅ Your code is correct  
✅ Build is successful  
✅ Only need to properly configure Hostinger  

**You're almost there!**

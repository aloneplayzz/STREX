# StratiumeX - Hostinger Setup Guide (403 Forbidden Fix)

## Problem
You're getting a **403 Forbidden** error, which means:
- The Node.js application is not running
- OR there's an access/permission issue
- OR the server configuration is incorrect

---

## Solution: Step-by-Step Setup

### Step 1: Access Hostinger Control Panel

1. Log in to your Hostinger account
2. Go to **Hosting** → Your domain
3. Click **Manage**

### Step 2: Enable Node.js (If Not Already Done)

1. In the left sidebar, look for **Advanced** or **Node.js**
2. Click on **Node.js Manager** or **Applications**
3. Click **Create Application** or **Add Application**
4. Fill in these details:
   - **Application name**: `stratiumex`
   - **Application root**: `/home/youruser/public_html/` (or your deployment folder)
   - **Application URL**: `your-domain.com`
   - **Node.js version**: `18.x` or `20.x` (latest available)
   - **Entry point**: `dist/index.cjs`
   - **Application port**: `5000`

5. Click **Create**
6. Hostinger will automatically restart the application

### Step 3: Upload Your Built Application

1. Go to **File Manager** in Hostinger panel
2. Navigate to your domain's root folder (usually `public_html/`)
3. Upload these folders/files from your local `dist/` folder:
   - `public/` folder (contains `index.html` and assets)
   - `index.cjs` file
   - `package.json` file
   - `node_modules/` folder (install on server instead)

### Step 4: Install Dependencies on Server

1. In Hostinger, go to **Terminal** (or SSH)
2. Navigate to your app folder:
   ```bash
   cd /home/youruser/public_html/
   ```

3. Install production dependencies:
   ```bash
   npm install --production
   ```

4. Wait for installation to complete (may take 5-10 minutes)

### Step 5: Restart Node.js Application

1. Go back to **Node.js Manager** in Hostinger panel
2. Find your application (`stratiumex`)
3. Click **Restart** button
4. Wait 30-60 seconds for restart

### Step 6: Verify Deployment

1. Go to your domain in a browser
2. Refresh the page (Ctrl+Shift+R for hard refresh)
3. You should see the homepage instead of 403 error

---

## Alternative: Use Hostinger's One-Click Deploy (If Available)

Some Hostinger plans offer **Git deployment**:

1. Push your code to GitHub
2. In Hostinger panel, go to **Git** or **Version Control**
3. Connect your GitHub repository
4. Select branch and deployment folder
5. Hostinger auto-deploys on push

---

## Troubleshooting 403 Forbidden

### Cause 1: Node.js App Not Running
**Fix:**
- Check **Node.js Manager** → Is the app status "Running"?
- If not, click **Restart**
- Check **Application logs** for errors

### Cause 2: Wrong Entry Point
**Fix:**
- In Node.js Manager, verify **Entry point** is set to: `dist/index.cjs`
- NOT: `server/index.ts` or `server.js`

### Cause 3: Missing Dependencies
**Fix:**
```bash
cd /home/youruser/public_html/
npm install --production
```

### Cause 4: Port Conflict
**Fix:**
- Change port in Node.js Manager from 5000 to 3000, 8080, or another available port
- This sometimes fixes permission issues

### Cause 5: Missing dist/ Folder
**Fix:**
```bash
# On your LOCAL machine
npm run build

# Upload the entire 'dist' folder to Hostinger
```

---

## Complete Deployment Checklist

- [ ] Node.js enabled in Hostinger panel
- [ ] Node.js application created in Application Manager
- [ ] Entry point set to `dist/index.cjs`
- [ ] `dist/public/` folder uploaded
- [ ] `dist/index.cjs` file uploaded
- [ ] `package.json` in root uploaded
- [ ] `npm install --production` run on server
- [ ] Application status is "Running"
- [ ] Website accessible without 403 error

---

## File Structure Expected on Hostinger

```
/home/youruser/public_html/
├── dist/
│   ├── public/
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── index-*.css
│   │   │   └── index-*.js
│   ├── index.cjs          ← Entry point
├── node_modules/          ← After npm install
├── package.json
├── package-lock.json
└── DEPLOYMENT_GUIDE_HOSTINGER.md
```

---

## Quick Terminal Commands for Hostinger

```bash
# Navigate to your app
cd /home/youruser/public_html/

# Check if node is installed
node --version

# Install dependencies
npm install --production

# Check if server is running
ps aux | grep node

# View recent logs (if accessible)
tail -50 ~/.pm2/logs/*.log

# Start app manually (if needed)
node dist/index.cjs
```

---

## Environment Variables (If Needed)

Create a `.env` file in your root folder:
```bash
NODE_ENV=production
PORT=5000
```

Then restart the application in Node.js Manager.

---

## Getting Help from Hostinger Support

If you're still seeing 403 Forbidden after these steps, contact Hostinger support with:
1. Your domain name
2. Application name (stratiumex)
3. Screenshot of **Node.js Manager** showing your app status
4. Screenshot of **Application Logs** (if available)

They can check server-side issues and permissions.

---

## FAQ

**Q: Why am I getting 403?**
A: Node.js app isn't running or isn't configured correctly.

**Q: How long does deployment take?**
A: 5-10 minutes for npm install, 1-2 minutes for restart.

**Q: Do I need the source code uploaded?**
A: No, only the `dist/` folder and `package.json` are needed.

**Q: Can I use cPanel instead?**
A: If your plan is "Standard" (cPanel), you'll need to upgrade to Node.js support or use a static hosting alternative.

**Q: How do I update the site after deployment?**
A: Rebuild locally (`npm run build`), upload `dist/` folder, restart app in Node.js Manager.

---

**Status:** Ready for production  
**Last Updated:** December 1, 2025  
**Support:** Contact Hostinger support or refer to their Node.js documentation

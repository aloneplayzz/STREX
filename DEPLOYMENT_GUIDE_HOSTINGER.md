# StratiumeX Deployment Guide for Hostinger

## Project Overview
This is a full-stack application with:
- **Frontend**: React with Vite (TypeScript)
- **Backend**: Express.js
- **Storage**: Browser localStorage only (no database)
- **Authentication**: Mock authentication system

---

## Deployment Options for Hostinger

### Option 1: Node.js Hosting (Recommended)
**Best for**: Full-stack deployment on Hostinger's Business or higher plans with Node.js support

#### Prerequisites:
- Hostinger hosting plan with Node.js support
- Node.js 18+ installed on your server
- SSH access to your server
- npm or yarn package manager

#### Deployment Steps:

1. **Build the Application Locally**
   ```bash
   npm run build
   ```
   This creates a `dist` folder containing:
   - Built frontend (optimized React app)
   - Built backend (Node.js server bundle)

2. **Upload to Hostinger**
   - Use SFTP/FTP or Git to upload the entire project folder to your Hostinger server
   - Recommended path: `/home/username/public_html/stratiumex/`

3. **Install Dependencies on Server**
   ```bash
   cd /home/username/public_html/stratiumex/
   npm install --production
   ```

4. **Start the Application**
   ```bash
   npm start
   ```
   
   Or use PM2 for production (recommended):
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "stratiumex"
   pm2 startup
   pm2 save
   ```

5. **Configure Port**
   - By default, the app runs on port 5000
   - Use a reverse proxy (nginx) or configure Hostinger's port forwarding
   - Set environment variable: `PORT=3000`

6. **Set Environment Variables on Server**
   Create a `.env` file in your project root:
   ```bash
   NODE_ENV=production
   PORT=3000
   ```

---

### Option 2: Static Frontend + Separate Backend (Advanced)
**Best for**: Separating concerns or hosting frontend on different CDN

#### Frontend Only Deployment:
1. Generate frontend build:
   ```bash
   npm run build
   ```

2. Upload only the `dist/client` folder to Hostinger's public_html

3. Backend separately on another server or subdomain

---

### Option 3: Docker Deployment (If Hostinger supports Docker)
**Create a Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and deploy using Docker CLI on Hostinger.

---

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Build process tested locally: `npm run build`
- [ ] dist/ folder generated successfully
- [ ] No sensitive data in .env files
- [ ] Node.js 18+ available on server
- [ ] SSH/SFTP access configured
- [ ] Port 5000 (or custom port) available

---

## File Structure After Deployment

```
/home/username/public_html/stratiumex/
├── dist/
│   ├── client/              # React frontend build
│   └── index.cjs            # Express backend bundle
├── node_modules/            # Dependencies
├── package.json
├── .env                     # Environment variables
├── README.md
└── package-lock.json
```

---

## Local Build Instructions

Before uploading to Hostinger, test the build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

The app should be accessible at `http://localhost:5000`

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env or use PM2
pm2 start "PORT=3000 npm start" --name "stratiumex"
```

### Module Not Found Errors
```bash
# Reinstall dependencies on server
rm -rf node_modules package-lock.json
npm install --production
```

### White Screen / 404 Errors
- Ensure frontend build is in dist/client
- Check reverse proxy configuration for static file serving
- Verify EXPRESS_ENV is set to 'production'

### Performance Issues
- Use PM2 with multiple instances:
  ```bash
  pm2 start "npm start" -i max
  ```
- Enable gzip compression in Express
- Use a CDN for static assets

---

## Nginx Reverse Proxy Configuration

If Hostinger uses Nginx, configure:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Security Recommendations

1. **Use HTTPS**
   - Enable SSL certificate (Hostinger usually provides Let's Encrypt)
   
2. **Restrict SSH Access**
   - Use key-based authentication only
   - Disable password login
   
3. **Regular Backups**
   - Backup your entire project folder weekly
   
4. **Monitor Logs**
   ```bash
   pm2 logs stratiumex
   ```

5. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

---

## Performance Optimization

1. **Enable Compression**
   - Already configured in Express middleware

2. **Browser Caching**
   - Static assets cached for 1 year
   - HTML cached per session

3. **Monitor Memory**
   ```bash
   pm2 monit
   ```

4. **Database Optimization**
   - Currently using browser localStorage (no backend database)
   - Data persists in browser across sessions

---

## Scaling for Future Growth

If you need to add features:
- PostgreSQL database integration ready
- Authentication system expandable
- API structure ready for mobile apps
- WebSocket support included

---

## Support Resources

- Hostinger Documentation: https://support.hostinger.com/
- Node.js Documentation: https://nodejs.org/docs/
- Express.js Guide: https://expressjs.com/
- PM2 Documentation: https://pm2.keymetrics.io/

---

## Quick Start Command Summary

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Use PM2 for production (recommended)
npm install -g pm2
pm2 start "npm start" --name "stratiumex"
pm2 startup
pm2 save
```

---

**Last Updated:** December 1, 2025
**Version:** 1.0.0
**Status:** Ready for Production Deployment

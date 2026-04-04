# Vercel Deployment Guide

## ✅ What's Been Set Up
Your project is now configured for Vercel deployment with:
- ✓ `vercel.json` - Proper routing and build configuration
- ✓ API functions in `/api/register.js` - Serverless endpoints
- ✓ Static files (HTML, CSS, JS) configured for serving
- ✓ Environment variables support via `.env.local`

## 🚀 Steps to Deploy on Vercel

### 1. Push to Git Repository
```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel (if not already)
- Go to [vercel.com](https://vercel.com) and sign in
- Click "New Project"
- Import your GitHub repository
- Select the repository and click "Import"

### 3. Set Environment Variables in Vercel Dashboard
In your Vercel project settings, go to **Settings > Environment Variables** and add:

**Variable Name:** `DATABASE_URL`
**Value:** Your PostgreSQL connection string from Neon/Heroku/your provider

Example format:
```
postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

### 4. Deploy
- Click "Deploy" - Vercel will automatically detect `vercel.json` and deploy your project
- Your site will be live at `https://tech-registration-xxxx.vercel.app`

### 5. Connect Custom Domain (Optional)
- In Vercel project settings, go to **Domains**
- Add your custom domain (e.g., `tech-registration.vercel.app`)
- Follow the DNS configuration steps provided by Vercel

## ✅ Important Notes
- Your `script.js` already calls `/api/register` - this works perfectly with Vercel routing
- Database connections will be handled by serverless functions - no persistent server needed
- The `.env.local` file is ONLY for local development - Vercel uses dashboard environment variables in production

## 🔧 Local Testing (Optional)
To test locally before deployment:
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`

## ❓ Troubleshooting
- **Database connection fails:** Check that `DATABASE_URL` is correctly set in Vercel environment variables
- **Static files missing:** The routing in `vercel.json` handles this automatically
- **CORS errors:** Already configured in `/api/register.js`

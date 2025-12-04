# 🚀 Deployment Guide - Task Manager API v2

Complete guide to deploy your Task Manager API v2 to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All tests pass locally
- ✅ MongoDB connection works
- ✅ Environment variables are configured
- ✅ Dependencies are up to date
- ✅ Code is pushed to GitHub
- ✅ .env file is in .gitignore

---

## 🗄️ MongoDB Atlas Setup (Free Tier)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a new project (e.g., "Task Manager")

### Step 2: Create Cluster

1. Click "Build a Cluster"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider and region (closest to you)
4. Name your cluster (e.g., "taskmanager-cluster")
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Select "Password" authentication
4. Username: `taskuser` (or your choice)
5. Password: Generate secure password or create one
6. **SAVE THIS PASSWORD!** You'll need it later
7. Database User Privileges: "Read and write to any database"
8. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for serverless deployments
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string:
   ```
   mongodb+srv://taskuser:<password>@taskmanager-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name before `?`:
   ```
   mongodb+srv://taskuser:yourpassword@taskmanager-cluster.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

---

## 🌐 Option 1: Deploy to Render (Recommended)

### Why Render?

- ✅ Free tier available
- ✅ Easy deployment from GitHub
- ✅ Auto-deploy on push
- ✅ Built-in health checks
- ✅ Good for REST APIs

### Step 1: Prepare Repository

1. Push code to GitHub
2. Make sure `.env` is in `.gitignore`

### Step 2: Create Render Account

1. Go to [Render](https://render.com/)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name:** task-manager-api-v2
   - **Region:** Choose closest to you
   - **Branch:** main (or master)
   - **Root Directory:** (leave empty)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 4: Add Environment Variables

1. Scroll to "Environment Variables"
2. Add these variables:

```
PORT = 3000
NODE_ENV = production
MONGODB_URI = mongodb+srv://taskuser:yourpassword@taskmanager-cluster.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET = your_super_secret_production_jwt_key_use_long_random_string
JWT_EXPIRE = 7d
```

**⚠️ IMPORTANT:**

- Use a STRONG JWT_SECRET for production
- Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Check logs for any errors
4. You should see: "✅ MongoDB Connected" in logs

### Step 6: Test Your API

Your API will be available at:

```
https://task-manager-api-v2.onrender.com
```

Test endpoints:

```bash
# Health check
curl https://task-manager-api-v2.onrender.com/info

# Swagger docs
https://task-manager-api-v2.onrender.com/api-docs

# Register user
curl -X POST https://task-manager-api-v2.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Auto-Deploy Setup

Render automatically deploys when you push to GitHub!

Just push changes:

```bash
git add .
git commit -m "Update API"
git push origin main
```

Render will automatically rebuild and deploy.

---

## ☁️ Option 2: Deploy to Vercel

### Why Vercel?

- ✅ Extremely fast deployment
- ✅ Free tier available
- ✅ Great for serverless
- ✅ Auto SSL
- ✅ Easy CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Configure for Vercel

Your `vercel.json` is already configured:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```

And `api/index.js`:

```javascript
const app = require("../app");
module.exports = app;
```

### Step 4: Deploy

```bash
cd "c:\Users\usama\Downloads\Internship Tasks\Week 3\Day 2\Task-Manager-API-V2"
vercel
```

Follow prompts:

- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- What's your project's name? task-manager-api-v2
- In which directory is your code located? **./ ** (current directory)

### Step 5: Add Environment Variables

```bash
vercel env add MONGODB_URI
# Paste your MongoDB Atlas connection string

vercel env add JWT_SECRET
# Enter a strong secret key

vercel env add JWT_EXPIRE
# Enter: 7d

vercel env add NODE_ENV
# Enter: production
```

### Step 6: Deploy to Production

```bash
vercel --prod
```

Your API will be available at:

```
https://task-manager-api-v2.vercel.app
```

### Update Deployment

To update your deployment:

```bash
git add .
git commit -m "Update API"
git push
vercel --prod
```

---

## 🔧 Option 3: Deploy to Railway

### Why Railway?

- ✅ Free $5 credit monthly
- ✅ Easy MongoDB integration
- ✅ Simple deployment
- ✅ GitHub auto-deploy

### Step 1: Create Railway Account

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Add MongoDB

1. Click "New" → "Database" → "Add MongoDB"
2. Railway will create a MongoDB instance
3. Copy the connection string from variables

### Step 4: Configure Environment

1. Go to your app service
2. Click "Variables" tab
3. Add variables:

```
MONGODB_URI = (from Railway MongoDB)
JWT_SECRET = your_secret_key_here
JWT_EXPIRE = 7d
NODE_ENV = production
```

### Step 5: Deploy

Railway auto-deploys! Just push to GitHub:

```bash
git push origin main
```

Your API will be available at the generated Railway URL.

---

## 🧪 Post-Deployment Testing

### Test 1: API Health Check

```bash
curl https://your-api-url.com/info
```

Should return API information.

### Test 2: Swagger Documentation

Visit: `https://your-api-url.com/api-docs`

Should display interactive API documentation.

### Test 3: Register User

```bash
curl -X POST https://your-api-url.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Test",
    "email": "prod@test.com",
    "password": "test123"
  }'
```

Should return user and JWT token.

### Test 4: Create Task

```bash
# Use token from previous request
curl -X POST https://your-api-url.com/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Production Task",
    "completed": false
  }'
```

Should create task successfully.

---

## 🔒 Production Security Checklist

- [ ] Strong JWT_SECRET (32+ random characters)
- [ ] MongoDB user has limited permissions
- [ ] MONGODB_URI kept secret
- [ ] .env file not in repository
- [ ] CORS configured if needed
- [ ] Rate limiting enabled (optional)
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] MongoDB network access configured
- [ ] Logs monitored for errors
- [ ] Database backed up regularly

---

## 📊 Monitoring Your API

### Render Monitoring

1. Go to Dashboard
2. Click on your service
3. View:
   - Logs (real-time)
   - Metrics (CPU, Memory)
   - Deploy history

### MongoDB Atlas Monitoring

1. Go to Clusters
2. Click "Metrics"
3. View:
   - Operations
   - Connections
   - Network
   - Disk usage

### Check API Health

Set up monitoring with:

- [UptimeRobot](https://uptimerobot.com/) - Free
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

Monitor endpoint: `https://your-api-url.com/info`

---

## 🐛 Troubleshooting

### Issue 1: MongoDB Connection Timeout

**Solution:**

- Check network access in MongoDB Atlas (allow 0.0.0.0/0)
- Verify connection string is correct
- Check if MongoDB user has correct permissions

### Issue 2: "Cannot GET /"

**Solution:**

- For Vercel: Make sure `vercel.json` is configured
- For Render: Check start command is `npm start`
- Verify `api/index.js` exports the app correctly

### Issue 3: Environment Variables Not Working

**Solution:**

- Restart the service after adding variables
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in values

### Issue 4: JWT Token Issues

**Solution:**

- Make sure JWT_SECRET is set in production
- Check if token is in correct format: `Bearer token`
- Verify JWT_EXPIRE is set (e.g., "7d")

### Issue 5: CORS Errors

**Solution:**
Add CORS middleware in `app.js`:

```javascript
const cors = require("cors");
app.use(cors());
```

Then:

```bash
npm install cors
git push
```

---

## 📱 Update Your Postman Collection

Update base URL to production:

```
https://your-api-url.com
```

Test all endpoints to ensure everything works!

---

## 🎉 Deployment Complete!

Your Task Manager API v2 is now live!

**Next Steps:**

1. ✅ Test all endpoints in production
2. ✅ Update README with live URL
3. ✅ Share Swagger docs link
4. ✅ Monitor logs for errors
5. ✅ Set up automatic backups

**Share Your API:**

- Live URL: `https://your-api-url.com`
- Swagger Docs: `https://your-api-url.com/api-docs`
- GitHub Repo: `https://github.com/yourusername/task-manager-api-v2`

---

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Verify MongoDB connection
3. Review environment variables
4. Check platform status page
5. Contact support of your hosting platform

---

**Congratulations on deploying your production-ready API! 🚀**

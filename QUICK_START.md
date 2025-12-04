# 🚀 Quick Start Guide - Task Manager API v2

Get your Task Manager API v2 up and running in 5 minutes!

---

## ⚡ Super Quick Start (3 Steps)

### 1. Install Dependencies

```bash
cd "c:\Users\usama\Downloads\Internship Tasks\Week 3\Day 2\Task-Manager-API-V2"
npm install
```

### 2. Configure Environment

The `.env` file is already created! Just update MongoDB URI if needed:

```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
```

### 3. Start Server

```bash
npm run dev
```

**✅ Done!** Visit `http://localhost:3000/api-docs`

---

## 🗄️ MongoDB Options

### Option A: Local MongoDB (Fast)

```bash
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Then start it:
mongod

# In another terminal:
npm run dev
```

### Option B: MongoDB Atlas (Cloud - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free cluster (M0 - takes 3 mins)
3. Create database user
4. Get connection string
5. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

6. Run: `npm run dev`

---

## 🧪 Test the API (Use Swagger UI)

### Step 1: Open Swagger

Visit: `http://localhost:3000/api-docs`

### Step 2: Register a User

1. Find `POST /api/users/register`
2. Click "Try it out"
3. Use this data:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

4. Click "Execute"
5. **Copy the token** from response

### Step 3: Authorize

1. Click the green "Authorize" button at top
2. Enter: `Bearer YOUR_TOKEN_HERE`
3. Click "Authorize"
4. Close dialog

### Step 4: Create a Task

1. Find `POST /api/tasks`
2. Click "Try it out"
3. Use this data:

```json
{
  "title": "My First Task",
  "completed": false
}
```

4. Click "Execute"
5. ✅ Task created!

### Step 5: Get All Tasks

1. Find `GET /api/tasks`
2. Click "Try it out"
3. Click "Execute"
4. See your task!

---

## 📱 Test with Postman (Alternative)

### Quick Postman Test

1. **Register:**

```
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

2. **Copy token from response**

3. **Create Task:**

```
POST http://localhost:3000/api/tasks
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "title": "Learn MongoDB",
  "completed": false
}
```

---

## 🌐 Deploy in 5 Minutes

### Deploy to Render (Easiest)

1. **Push to GitHub** (if not already)

```bash
git init
git add .
git commit -m "Task Manager API v2"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - New → Web Service
   - Connect your repo
   - Add environment variables:
     - `MONGODB_URI` = (your MongoDB Atlas string)
     - `JWT_SECRET` = (random long string)
     - `NODE_ENV` = production
   - Click "Create Web Service"
   - Wait 3 minutes... **Done!** 🎉

---

## 📚 Available Endpoints

### Public (No Auth)

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /info` - API information

### Protected (Require JWT)

- `GET /api/users/me` - Get profile
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/stats` - Get statistics

---

## 🔧 Useful Commands

```bash
# Development (with auto-reload)
npm run dev

# Production mode
npm start

# Install new package
npm install package-name

# Check for errors
npm run test
```

---

## 🐛 Common Issues & Solutions

### Issue: "MongoDB Connection Error"

**Solution:** Make sure MongoDB is running

```bash
# Check if MongoDB is running
mongod

# Or use MongoDB Atlas cloud database
```

### Issue: "Port 3000 already in use"

**Solution:** Change port in `.env`

```env
PORT=3001
```

### Issue: "JWT Token Invalid"

**Solution:**

- Make sure format is: `Bearer YOUR_TOKEN`
- Token should have no line breaks
- Re-login to get fresh token

### Issue: "Cannot find module 'dotenv'"

**Solution:**

```bash
npm install
```

---

## 📖 Documentation Files

- **README.md** - Complete API documentation
- **TESTING_GUIDE.md** - Detailed testing instructions
- **DEPLOYMENT_GUIDE.md** - Production deployment guide
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details

---

## 🎯 Next Steps

1. ✅ Test all endpoints locally
2. ✅ Read TESTING_GUIDE.md for comprehensive tests
3. ✅ Deploy to Render/Vercel (see DEPLOYMENT_GUIDE.md)
4. ✅ Share your API with team
5. ✅ Add to your portfolio!

---

## 💡 Pro Tips

1. **Use Swagger UI** - It's the easiest way to test
2. **Save your tokens** - Keep them in a text file while testing
3. **Test with 2 users** - Create 2 accounts to test data isolation
4. **Check MongoDB** - Use MongoDB Compass to see data visually
5. **Read the logs** - They show exactly what's happening

---

## 🎓 What You've Built

A production-ready REST API with:

- ✅ MongoDB database
- ✅ JWT authentication
- ✅ User management
- ✅ Protected routes
- ✅ Input validation
- ✅ Swagger documentation
- ✅ Error handling
- ✅ Security best practices

---

## 📞 Need Help?

1. Check error logs in terminal
2. Read TESTING_GUIDE.md
3. Check MongoDB connection
4. Verify environment variables
5. Review DEPLOYMENT_GUIDE.md for deployment issues

---

## 🎉 You're Ready!

Start the server and begin testing:

```bash
npm run dev
```

Then visit:

- **API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api-docs
- **API Info:** http://localhost:3000/info

**Happy coding! 🚀**

---

**Time to complete:** 5-10 minutes
**Difficulty:** Beginner-friendly with guides
**Status:** Production-ready ✅

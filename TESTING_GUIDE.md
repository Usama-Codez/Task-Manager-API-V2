# 🧪 Task Manager API v2 - Testing Guide

This guide will help you test all the features of the Task Manager API v2 with MongoDB, JWT authentication, and validation.

---

## 📋 Prerequisites

Before testing, make sure you have:

- ✅ Installed all dependencies (`npm install`)
- ✅ MongoDB running (local or Atlas)
- ✅ Configured `.env` file with correct values
- ✅ Server running (`npm run dev` or `npm start`)

---

## 🚀 Quick Start Testing

### Step 1: Start the Server

```bash
npm run dev
```

You should see:

```
🚀 Server running on http://localhost:3000
📚 Swagger Docs → http://localhost:3000/api-docs
✅ MongoDB Connected: localhost
```

### Step 2: Open Swagger UI

Visit: `http://localhost:3000/api-docs`

---

## 🔐 Authentication Flow Testing

### Test 1: Register a New User

**Endpoint:** `POST /api/users/register`

**Request:**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@example.com",
      "createdAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

**✅ What to verify:**

- Status code is 201
- Token is returned
- Password is NOT in response
- User ID is generated

**❌ Test Validation Errors:**

1. Missing name:

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

Expected: 400 Bad Request - "Name is required"

2. Invalid email:

```json
{
  "name": "Test User",
  "email": "invalid-email",
  "password": "test123"
}
```

Expected: 400 Bad Request - "Please provide a valid email"

3. Short password:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123"
}
```

Expected: 400 Bad Request - "Password must be at least 6 characters long"

4. Duplicate email:
   Register same email twice
   Expected: 400 Bad Request - "User with this email already exists"

---

### Test 2: Login

**Endpoint:** `POST /api/users/login`

**Request:**

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**✅ What to verify:**

- Status code is 200
- Token is returned
- User info is correct

**❌ Test Validation Errors:**

1. Wrong password:

```json
{
  "email": "test@example.com",
  "password": "wrongpass"
}
```

Expected: 401 Unauthorized - "Invalid email or password"

2. Non-existent email:

```json
{
  "email": "notfound@example.com",
  "password": "test123"
}
```

Expected: 401 Unauthorized - "Invalid email or password"

---

### Test 3: Get Current User Profile

**Endpoint:** `GET /api/users/me`

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "..."
  },
  "message": "User retrieved successfully"
}
```

**✅ What to verify:**

- Status code is 200
- User data is returned
- Password is NOT included

**❌ Test Without Token:**
Remove Authorization header
Expected: 401 Unauthorized - "Not authorized to access this route. Please login."

**❌ Test With Invalid Token:**

```
Authorization: Bearer invalid_token_here
```

Expected: 401 Unauthorized - "Not authorized. Token verification failed."

---

## 📝 Task Management Testing

### IMPORTANT: Use the token from login for all task requests!

Copy the token from login response and add to Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Test 4: Create Tasks

**Endpoint:** `POST /api/tasks`

**Request 1:**

```json
{
  "title": "Learn MongoDB",
  "completed": false
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Learn MongoDB",
    "completed": false,
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Task created successfully"
}
```

**Create More Tasks:**

Request 2:

```json
{
  "title": "Build REST API",
  "completed": true
}
```

Request 3:

```json
{
  "title": "Learn JWT Authentication"
}
```

(completed defaults to false)

**✅ What to verify:**

- Status code is 201
- Task has MongoDB ObjectId (\_id)
- Task is linked to user
- Timestamps are added

**❌ Test Validation Errors:**

1. Missing title:

```json
{
  "completed": false
}
```

Expected: 400 Bad Request - "Title is required"

2. Empty title:

```json
{
  "title": "",
  "completed": false
}
```

Expected: 400 Bad Request - "Title cannot be empty"

3. Invalid completed type:

```json
{
  "title": "Test Task",
  "completed": "yes"
}
```

Expected: 400 Bad Request - "Completed must be a boolean value"

---

### Test 5: Get All Tasks

**Endpoint:** `GET /api/tasks`

**Expected Response (200):**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "title": "Learn JWT Authentication",
      "completed": false,
      "user": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "...",
      "title": "Build REST API",
      "completed": true,
      "user": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "...",
      "title": "Learn MongoDB",
      "completed": false,
      "user": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "message": "Tasks retrieved successfully"
}
```

**✅ What to verify:**

- Status code is 200
- Count matches number of tasks
- Tasks are sorted by creation date (newest first)
- Only YOUR tasks are returned (user-specific)

---

### Test 6: Filter Tasks

**Test Filter by Title:**

```
GET /api/tasks?title=learn
```

Should return tasks containing "learn" (case-insensitive)

**Test Filter by Completion:**

```
GET /api/tasks?completed=true
```

Should return only completed tasks

```
GET /api/tasks?completed=false
```

Should return only pending tasks

**Test Combined Filters:**

```
GET /api/tasks?title=learn&completed=false
```

Should return pending tasks containing "learn"

---

### Test 7: Get Task by ID

**Endpoint:** `GET /api/tasks/:id`

Use an ID from your tasks list.

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Learn MongoDB",
    "completed": false,
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Task retrieved successfully"
}
```

**✅ What to verify:**

- Status code is 200
- Correct task is returned

**❌ Test Errors:**

1. Invalid ID format:

```
GET /api/tasks/invalid123
```

Expected: 404 Not Found - "Task not found"

2. Non-existent ID:

```
GET /api/tasks/507f1f77bcf86cd799439011
```

Expected: 404 Not Found - "Task not found"

3. Another user's task:
   Create a second user, get their task ID, try to access with first user's token
   Expected: 403 Forbidden - "Not authorized to access this task"

---

### Test 8: Update Tasks

**Endpoint:** `PUT /api/tasks/:id`

**Update Title Only:**

```json
{
  "title": "Master MongoDB and Mongoose"
}
```

**Update Completed Only:**

```json
{
  "completed": true
}
```

**Update Both:**

```json
{
  "title": "Completed MongoDB Course",
  "completed": true
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Completed MongoDB Course",
    "completed": true,
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Task updated successfully"
}
```

**✅ What to verify:**

- Status code is 200
- Task is updated correctly
- updatedAt timestamp changes

**❌ Test Validation Errors:**

1. No fields provided:

```json
{}
```

Expected: 400 Bad Request - "At least one field (title or completed) must be provided"

2. Empty title:

```json
{
  "title": "   "
}
```

Expected: 400 Bad Request - "Title cannot be empty"

3. Wrong task ID:
   Expected: 404 Not Found - "Task not found"

4. Another user's task:
   Expected: 403 Forbidden - "Not authorized to update this task"

---

### Test 9: Delete Tasks

**Endpoint:** `DELETE /api/tasks/:id`

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Learn MongoDB",
    "completed": false,
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Task deleted successfully"
}
```

**✅ What to verify:**

- Status code is 200
- Deleted task data is returned
- Task is actually removed (try to get it again - should be 404)

**❌ Test Errors:**

1. Wrong task ID:
   Expected: 404 Not Found - "Task not found"

2. Another user's task:
   Expected: 403 Forbidden - "Not authorized to delete this task"

3. Already deleted task:
   Expected: 404 Not Found - "Task not found"

---

### Test 10: Get Statistics

**Endpoint:** `GET /api/stats`

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 2,
    "pendingTasks": 3
  },
  "message": "Statistics retrieved successfully"
}
```

**✅ What to verify:**

- Status code is 200
- Numbers are accurate
- Only YOUR tasks are counted (user-specific)
- totalTasks = completedTasks + pendingTasks

---

## 🎯 Multi-User Testing

To test user isolation:

1. **Register User 1:**

   - Email: user1@test.com
   - Create 3 tasks
   - Save token as TOKEN_1

2. **Register User 2:**

   - Email: user2@test.com
   - Create 2 tasks
   - Save token as TOKEN_2

3. **Test Isolation:**
   - Use TOKEN_1: Should see 3 tasks
   - Use TOKEN_2: Should see 2 tasks
   - Use TOKEN_1 to access User 2's task: Should get 403 Forbidden

---

## 📊 Testing Checklist

### Authentication

- [ ] Register with valid data (201)
- [ ] Register with duplicate email (400)
- [ ] Register with invalid email (400)
- [ ] Register with short password (400)
- [ ] Login with correct credentials (200)
- [ ] Login with wrong password (401)
- [ ] Login with non-existent email (401)
- [ ] Get profile with valid token (200)
- [ ] Get profile without token (401)
- [ ] Get profile with invalid token (401)

### Tasks

- [ ] Create task with valid data (201)
- [ ] Create task without title (400)
- [ ] Create task with invalid completed type (400)
- [ ] Get all tasks (200)
- [ ] Filter tasks by title (200)
- [ ] Filter tasks by completion status (200)
- [ ] Get task by valid ID (200)
- [ ] Get task by invalid ID (404)
- [ ] Update task with valid data (200)
- [ ] Update task with no fields (400)
- [ ] Update another user's task (403)
- [ ] Delete task successfully (200)
- [ ] Delete non-existent task (404)
- [ ] Delete another user's task (403)
- [ ] Get statistics (200)

### Security

- [ ] Tasks are user-specific
- [ ] Cannot access other users' tasks
- [ ] Password is hashed in database
- [ ] Password never returned in responses
- [ ] JWT token expires after configured time
- [ ] Protected routes require authentication

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoDB Connection Error"

**Solution:**

- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- For Atlas: Check network access and credentials

### Issue 2: "jwt malformed"

**Solution:**

- Make sure token format is: `Bearer YOUR_TOKEN`
- Check if token is complete (no spaces or breaks)

### Issue 3: "401 Unauthorized"

**Solution:**

- Login again to get a fresh token
- Check if token is expired (default: 7 days)
- Verify Authorization header is set

### Issue 4: "Task not found" on valid ID

**Solution:**

- Make sure you're using the correct user's token
- Check if task actually exists in database
- Verify task belongs to authenticated user

---

## 📝 Testing with Postman

1. **Create Environment:**

   - Variable: `base_url` = `http://localhost:3000`
   - Variable: `token` = (will be set automatically)

2. **Setup Auth:**

   - After login, add to Tests tab:

   ```javascript
   pm.environment.set("token", pm.response.json().data.token);
   ```

3. **Use Token:**
   - In Authorization tab: Type = Bearer Token
   - Token: `{{token}}`

---

## ✅ Success Criteria

Your API is working correctly if:

1. ✅ All authentication endpoints work with proper validation
2. ✅ Users can only access their own tasks
3. ✅ All CRUD operations work on tasks
4. ✅ Filtering and search work correctly
5. ✅ Statistics are accurate
6. ✅ Proper error messages for all validation errors
7. ✅ JWT tokens expire and refresh correctly
8. ✅ Swagger documentation is accessible and functional

---

**Happy Testing! 🎉**

If you find any issues, check the console logs and MongoDB for more details.

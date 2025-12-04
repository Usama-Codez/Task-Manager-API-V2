# 📝 Task Manager API v2

A production-ready RESTful API for managing tasks with **MongoDB** database, **JWT authentication**, **express-validator** for input validation, and comprehensive **Swagger documentation**. Built with Node.js and Express.js.

🌐 **[Live Demo](https://task-manager-api-v2-swart.vercel.app/)** | 📚 **[API Documentation](https://task-manager-api-v2-swart.vercel.app/api-docs)**

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/usama-codez/Task-Manager-API-V2)

---

## 🚀 What's New in v2

- ✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- ✅ **JWT Authentication** - Secure user registration and login
- ✅ **Protected Routes** - Users can only access their own tasks
- ✅ **Express Validator** - Comprehensive input validation
- ✅ **Password Hashing** - Secure password storage with bcryptjs
- ✅ **User-specific Tasks** - Each user has their own task collection
- ✅ **Enhanced Swagger Docs** - Complete API documentation with authentication

---

## 📋 Features

### Authentication

- 🔐 User registration with validation
- 🔑 Secure login with JWT token generation
- 👤 Get current user profile
- 🛡️ Password encryption with bcryptjs

### Task Management

- ✅ Create, read, update, and delete tasks
- 🔒 User-specific task isolation
- 🔍 Search tasks by title
- ✔️ Filter tasks by completion status
- 📊 Task statistics (total, completed, pending)

### Security & Validation

- 🔐 JWT-based route protection
- ✔️ Request validation with express-validator
- 🔒 Password hashing
- 🚫 Authorization checks (users can only access their own data)

---

## 🛠️ Tech Stack

| Technology            | Purpose               |
| --------------------- | --------------------- |
| **Node.js**           | Runtime environment   |
| **Express.js**        | Web framework         |
| **MongoDB**           | Database              |
| **Mongoose**          | MongoDB ODM           |
| **JWT**               | Authentication tokens |
| **bcryptjs**          | Password hashing      |
| **express-validator** | Input validation      |
| **Swagger**           | API documentation     |
| **dotenv**            | Environment variables |

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/usama-codez/Task-Manager-API-V2.git
   cd Task-Manager-API-V2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   # For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

5. **Run the application**

   Development mode (with nodemon):

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm start
   ```

6. **Access the API**
   - API: `http://localhost:3000`
   - Swagger Docs: `http://localhost:3000/api-docs`

---

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint              | Description              | Auth Required |
| ------ | --------------------- | ------------------------ | ------------- |
| POST   | `/api/users/register` | Register a new user      | ❌            |
| POST   | `/api/users/login`    | Login user               | ❌            |
| GET    | `/api/users/me`       | Get current user profile | ✅            |

### Task Endpoints

| Method | Endpoint         | Description         | Auth Required |
| ------ | ---------------- | ------------------- | ------------- |
| GET    | `/api/tasks`     | Get all user tasks  | ✅            |
| GET    | `/api/tasks/:id` | Get specific task   | ✅            |
| POST   | `/api/tasks`     | Create new task     | ✅            |
| PUT    | `/api/tasks/:id` | Update task         | ✅            |
| DELETE | `/api/tasks/:id` | Delete task         | ✅            |
| GET    | `/api/stats`     | Get task statistics | ✅            |

### Query Parameters

**GET /api/tasks**

- `title` (string): Filter by title (case-insensitive)
- `completed` (boolean): Filter by completion status

Example: `/api/tasks?title=learn&completed=false`

---

## 📤 API Usage Examples

### 1. Register a New User

```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-04T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

### 2. Login

```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### 3. Create a Task (Protected Route)

```bash
POST /api/tasks
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Learn MongoDB",
  "completed": false
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f191e810c19729de860ea",
    "title": "Learn MongoDB",
    "completed": false,
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2025-12-04T10:35:00.000Z",
    "updatedAt": "2025-12-04T10:35:00.000Z"
  },
  "message": "Task created successfully"
}
```

### 4. Get All Tasks (Protected Route)

```bash
GET /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Learn MongoDB",
      "completed": false,
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2025-12-04T10:35:00.000Z",
      "updatedAt": "2025-12-04T10:35:00.000Z"
    }
  ],
  "message": "Tasks retrieved successfully"
}
```

### 5. Update a Task

```bash
PUT /api/tasks/507f191e810c19729de860ea
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Master MongoDB",
  "completed": true
}
```

### 6. Delete a Task

```bash
DELETE /api/tasks/507f191e810c19729de860ea
Authorization: Bearer YOUR_JWT_TOKEN
```

### 7. Get Task Statistics

```bash
GET /api/stats
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalTasks": 10,
    "completedTasks": 6,
    "pendingTasks": 4
  },
  "message": "Statistics retrieved successfully"
}
```

---

## 🧪 Testing with Postman

1. **Import Collection**

   - Use the provided `Task-Manager-API.postman_collection.json`
   - Or create requests manually using the examples above

2. **Authentication Flow**

   - Register a new user or login
   - Copy the JWT token from the response
   - Add to Authorization header: `Bearer YOUR_TOKEN`

3. **Environment Variables** (optional)
   - Create variables for `base_url` and `token`
   - Use `{{base_url}}` and `{{token}}` in requests

---

## 📁 Project Structure

```
Task-Manager-API-v2/
├── api/
│   └── index.js                 # Vercel serverless entry point
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Auth logic (register, login)
│   └── taskController.js        # Task CRUD operations
├── middlewares/
│   ├── auth.js                  # JWT authentication middleware
│   ├── errorHandler.js          # Global error handler
│   ├── validateRequest.js       # Express-validator middleware
│   └── validateTask.js          # Legacy task validation
├── models/
│   ├── Task.js                  # Mongoose Task schema
│   └── User.js                  # Mongoose User schema
├── routes/
│   ├── authRoutes.js            # Authentication routes
│   ├── statsRoutes.js           # Statistics routes
│   └── taskRoutes.js            # Task CRUD routes
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── app.js                       # Express app configuration
├── package.json                 # Dependencies and scripts
├── swagger.js                   # Swagger configuration
└── README.md                    # Documentation
```

---

## 🔒 Security Features

1. **Password Security**

   - Passwords hashed using bcryptjs (10 rounds)
   - Never stored or returned in plain text

2. **JWT Authentication**

   - Tokens expire after 7 days (configurable)
   - Secure token verification on protected routes

3. **Data Isolation**

   - Users can only access their own tasks
   - Authorization checks on all task operations

4. **Input Validation**
   - All inputs validated using express-validator
   - Proper error messages for invalid data

---

## 🌍 Deployment

### Deploying to Render

1. **Create a new Web Service**

   - Connect your GitHub repository
   - Select Node.js environment

2. **Configure Environment**

   - Add environment variables from `.env`
   - Set `MONGODB_URI` to your MongoDB Atlas connection string

3. **Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

### Deploying to Vercel

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env`

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user and get connection string
4. Update `MONGODB_URI` in environment variables

---

## 📚 API Documentation

Once the server is running, visit **`http://localhost:3000/api-docs`** to access the interactive Swagger documentation.

Features:

- 🎯 Try out API endpoints directly
- 📖 View request/response schemas
- 🔐 Test authentication with JWT tokens
- 💡 See example requests and responses

---

## 🧪 Validation Rules

### User Registration

- `name`: 2-50 characters, required
- `email`: Valid email format, required, unique
- `password`: Minimum 6 characters, required

### User Login

- `email`: Valid email format, required
- `password`: Required

### Task Creation

- `title`: 1-200 characters, required
- `completed`: Boolean, optional (defaults to false)

### Task Update

- `title`: 1-200 characters, optional
- `completed`: Boolean, optional
- At least one field must be provided

---

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "errors": [] // Array of validation errors (if applicable)
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📖 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT.io](https://jwt.io/)
- [Express Validator](https://express-validator.github.io/docs/)
- [Swagger/OpenAPI](https://swagger.io/docs/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@usama-codez](https://github.com/usama-codez)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the powerful database
- All open-source contributors

---

**Made with ❤️ using Node.js, Express.js, MongoDB, and JWT**

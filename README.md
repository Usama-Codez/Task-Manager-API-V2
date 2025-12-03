# 📝 Task Manager API

A RESTful API for managing tasks with in-memory storage. Built with Node.js, Express.js, and documented with Swagger UI.

## 🚀 Features

- ✅ Full CRUD operations for tasks
- ✅ In-memory data storage (no database required)
- ✅ UUID-based task identifiers
- ✅ Request validation middleware
- ✅ Consistent response structure
- ✅ Error handling middleware
- ✅ Search tasks by title
- ✅ Task statistics endpoint
- ✅ Complete Swagger API documentation
- ✅ Modular architecture (routes, controllers, middlewares)

## 📋 Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Request & Response Examples](#request--response-examples)
- [Project Structure](#project-structure)
- [Testing with Postman](#testing-with-postman)
- [Technologies Used](#technologies-used)

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Task-Manager-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## ▶️ Running the Project

### Development Mode (with auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Access Swagger Documentation:

Open your browser and visit: `http://localhost:3000/api-docs`

## 🌐 API Endpoints

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/tasks`     | Get all tasks (supports title search) |
| GET    | `/api/tasks/:id` | Get a specific task by ID             |
| POST   | `/api/tasks`     | Create a new task                     |
| PUT    | `/api/tasks/:id` | Update an existing task               |
| DELETE | `/api/tasks/:id` | Delete a task                         |
| GET    | `/api/stats`     | Get task statistics                   |

### Query Parameters

**GET /api/tasks**

- `title` (optional): Filter tasks by title (case-insensitive)
  - Example: `/api/tasks?title=learn`

## 📤 Request & Response Examples

### 1. Get All Tasks

**Request:**

```http
GET /api/tasks
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Learn Express",
      "completed": false
    },
    {
      "id": "987e6543-e21b-12d3-a456-426614174001",
      "title": "Build REST API",
      "completed": true
    }
  ],
  "message": "Tasks retrieved successfully"
}
```

### 2. Get Task by ID

**Request:**

```http
GET /api/tasks/123e4567-e89b-12d3-a456-426614174000
```

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Learn Express",
    "completed": false
  },
  "message": "Task retrieved successfully"
}
```

**Response (Not Found - 404):**

```json
{
  "success": false,
  "data": null,
  "message": "Task not found"
}
```

### 3. Create a New Task

**Request:**

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Learn Swagger",
  "completed": false
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "456e7890-e12b-12d3-a456-426614174002",
    "title": "Learn Swagger",
    "completed": false
  },
  "message": "Task created successfully"
}
```

**Validation Error (400):**

```json
{
  "success": false,
  "data": null,
  "message": "Title is required"
}
```

### 4. Update a Task

**Request:**

```http
PUT /api/tasks/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "title": "Master Express.js",
  "completed": true
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Master Express.js",
    "completed": true
  },
  "message": "Task updated successfully"
}
```

### 5. Delete a Task

**Request:**

```http
DELETE /api/tasks/123e4567-e89b-12d3-a456-426614174000
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Learn Express",
    "completed": false
  },
  "message": "Task deleted successfully"
}
```

### 6. Search Tasks by Title

**Request:**

```http
GET /api/tasks?title=learn
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Learn Express",
      "completed": false
    },
    {
      "id": "456e7890-e12b-12d3-a456-426614174002",
      "title": "Learn Swagger",
      "completed": false
    }
  ],
  "message": "Tasks retrieved successfully"
}
```

### 7. Get Task Statistics

**Request:**

```http
GET /api/stats
```

**Response (200):**

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

## 📁 Project Structure

```
Task-Manager-API/
├── controllers/
│   └── taskController.js       # Business logic for tasks
├── middlewares/
│   ├── errorHandler.js         # Global error handling
│   └── validateTask.js         # Request validation
├── routes/
│   └── taskRoutes.js           # API routes with Swagger docs
├── app.js                      # Main Express application
├── swagger.js                  # Swagger configuration
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore file
└── README.md                   # This file
```

## 🧪 Testing with Postman

1. **Import the Collection:**

   - Download the `Task-Manager-API.postman_collection.json` file
   - Open Postman
   - Click **Import** → Select the JSON file

2. **Test Each Endpoint:**

   - The collection includes all endpoints with sample requests
   - Test them in order: GET → POST → PUT → DELETE

3. **Environment Variables (Optional):**
   - Create a Postman environment
   - Add variable: `base_url` = `http://localhost:3000`
   - Use `{{base_url}}` in your requests

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Swagger UI Express** - API documentation
- **Swagger JSDoc** - Generate Swagger specs from JSDoc comments
- **UUID** - Generate unique identifiers
- **Nodemon** - Development auto-reload

## ✅ Validation Rules

### Creating a Task (POST)

- `title`: Required, must be a non-empty string
- `completed`: Optional, must be a boolean (defaults to `false`)

### Updating a Task (PUT)

- At least one field (`title` or `completed`) must be provided
- `title`: If provided, must be a non-empty string
- `completed`: If provided, must be a boolean

## 📊 Response Structure

All responses follow this consistent structure:

```json
{
  "success": true/false,
  "data": { ... } or null,
  "message": "Descriptive message"
}
```

## 🔍 HTTP Status Codes

- `200` - OK (successful GET, PUT, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 🎯 Stretch Goals Implemented

- ✅ UUID instead of numeric IDs
- ✅ Express Router for modular routes
- ✅ Organized folder structure (routes/, controllers/, middlewares/)
- ✅ Search functionality (GET /api/tasks?title=search)
- ✅ Statistics endpoint (GET /api/stats)

## 🆔 Sample Task IDs for Testing

The API comes pre-loaded with 2 sample tasks that have **fixed UUIDs**:

**Task 1:**

- ID: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- Title: "Learn Express"
- Completed: false

**Task 2:**

- ID: `b2c3d4e5-f6a7-8901-bcde-f12345678901`
- Title: "Build REST API"
- Completed: false

You can use these IDs directly in Postman or cURL to test GET, PUT, and DELETE operations.

## 📝 Notes

- This API uses **in-memory storage**, so all data will be lost when the server restarts
- Two sample tasks with fixed IDs are pre-loaded for testing
- The API is fully documented with Swagger at `/api-docs`

## 👨‍💻 Author

[Usama Akram](https://usamaakram.netlify.app)

## 📄 License

ISC

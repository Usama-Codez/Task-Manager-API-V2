const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API - v2",
      version: "2.0.0",
      description:
        "A production-ready RESTful API for managing tasks with MongoDB, JWT authentication, and express-validator. Built with Express.js and documented with Swagger.",
      contact: {
        name: "API Support",
        email: "support@taskmanager.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User registration, login, and authentication endpoints",
      },
      {
        name: "Tasks",
        description: "Task management endpoints (requires authentication)",
      },
      {
        name: "Statistics",
        description: "Task statistics endpoints (requires authentication)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
    },
  },
  // Use absolute paths that work in both local and Vercel environments
  apis: [
    path.join(__dirname, "./routes/*.js"),
    path.join(__dirname, "./routes/authRoutes.js"),
    path.join(__dirname, "./routes/taskRoutes.js"),
    path.join(__dirname, "./routes/statsRoutes.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

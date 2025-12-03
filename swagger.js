const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "A simple RESTful API for managing tasks with in-memory storage. Built with Express.js and documented with Swagger.",
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
        url: "https://task-manager-api-usama-codez.vercel.app",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
      {
        name: "Statistics",
        description: "Task statistics endpoints",
      },
    ],
  },
  // Use absolute paths that work in both local and Vercel environments
  apis: [
    path.join(__dirname, "./routes/*.js"),
    path.join(__dirname, "./routes/taskRoutes.js"),
    path.join(__dirname, "./routes/statsRoutes.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

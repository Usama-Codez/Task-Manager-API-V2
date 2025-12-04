require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const swaggerSpec = require("./swagger");
const taskRoutes = require("./routes/taskRoutes");
const statsRoutes = require("./routes/statsRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
// Serve swagger spec as JSON
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Custom Swagger UI HTML (using CDN for assets)
app.get("/api-docs", (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; padding: 0; }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "/swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>
  `;
  res.send(html);
});

// Root route - Redirect to Swagger UI
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// API info endpoint
app.get("/info", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Task Manager API v2",
    version: "2.0.0",
    features: [
      "MongoDB Database Integration",
      "JWT Authentication",
      "Express Validator",
      "Protected Routes",
      "Swagger Documentation",
    ],
    documentation: "/api-docs",
    endpoints: {
      auth: {
        register: "POST /api/users/register",
        login: "POST /api/users/login",
        profile: "GET /api/users/me",
      },
      tasks: {
        getAll: "GET /api/tasks",
        getById: "GET /api/tasks/:id",
        create: "POST /api/tasks",
        update: "PUT /api/tasks/:id",
        delete: "DELETE /api/tasks/:id",
      },
      stats: "GET /api/stats",
    },
  });
});

// API Routes
app.use("/api/users", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", statsRoutes); // /api/stats

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

// ➤ IMPORTANT: Do NOT listen in production (Vercel handles this)
//    Only start server when running locally
if (process.env.NODE_ENV !== "production") {
  // Connect to MongoDB for local development
  connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger Docs → http://localhost:${PORT}/api-docs`);
  });
}

// Export Express app for Vercel serverless function
module.exports = app;

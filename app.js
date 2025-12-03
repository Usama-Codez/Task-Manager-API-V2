const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const taskRoutes = require("./routes/taskRoutes");
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
const swaggerUiServe = swaggerUi.serve;
const swaggerUiSetup = swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Task Manager API Docs",
  swaggerOptions: {
    persistAuthorization: true,
  },
});

// Root route - Redirect to Swagger UI
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// API info endpoint
app.get("/info", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Task Manager API",
    documentation: "/api-docs",
    endpoints: {
      tasks: "/api/tasks",
      stats: "/api/stats",
    },
  });
});

// Swagger UI
app.use("/api-docs", swaggerUiServe);
app.get("/api-docs", swaggerUiSetup);

// API Routes
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
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger Docs → http://localhost:${PORT}/api-docs`);
  });
}

// Export Express app for Vercel serverless function
module.exports = app;

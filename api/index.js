const app = require("../app");
const connectDB = require("../config/db");

// Serverless handler that connects to DB before each request
module.exports = async (req, res) => {
  try {
    // Connect to MongoDB (uses cached connection if available)
    await connectDB();
    
    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error("Error in serverless function:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

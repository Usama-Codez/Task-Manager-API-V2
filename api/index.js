const app = require("../app");
const connectDB = require("../config/db");

// Serverless handler that connects to DB before each request
module.exports = async (req, res) => {
  try {
    // Debug: Log MONGODB_URI (first 20 chars only for security)
    const mongoUri = process.env.MONGODB_URI;
    console.log("MONGODB_URI exists:", !!mongoUri);
    console.log("MONGODB_URI starts with:", mongoUri ? mongoUri.substring(0, 20) : "undefined");
    
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
      debug: {
        mongoUriDefined: !!process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  }
};

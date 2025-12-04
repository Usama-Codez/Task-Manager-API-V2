const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes - Verify JWT token
 * Extracts user information from token and attaches to request
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from "Bearer <token>"
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found
  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Not authorized to access this route. Please login.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "User not found. Token may be invalid.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Not authorized. Token verification failed.",
    });
  }
};

module.exports = { protect };

/**
 * Middleware to validate task data
 * Validates title (required string) and completed (boolean)
 */
const validateTask = (req, res, next) => {
  const { title, completed } = req.body;

  // Validate title
  if (!title) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Title is required",
    });
  }

  if (typeof title !== "string") {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Title must be a string",
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Title cannot be empty",
    });
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Completed must be a boolean",
    });
  }

  next();
};

/**
 * Middleware to validate task updates
 * At least one field must be provided
 */
const validateTaskUpdate = (req, res, next) => {
  const { title, completed } = req.body;

  // At least one field must be provided
  if (title === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "At least one field (title or completed) must be provided",
    });
  }

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title must be a string",
      });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title cannot be empty",
      });
    }
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Completed must be a boolean",
    });
  }

  next();
};

module.exports = { validateTask, validateTaskUpdate };

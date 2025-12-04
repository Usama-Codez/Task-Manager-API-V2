const { body, validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      data: null,
      message: errors.array()[0].msg, // Return first error message
      errors: errors.array(),
    });
  }

  next();
};

/**
 * Validation rules for user registration
 */
const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  handleValidationErrors,
];

/**
 * Validation rules for user login
 */
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

/**
 * Validation rules for creating a task
 */
const validateCreateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean value"),

  handleValidationErrors,
];

/**
 * Validation rules for updating a task
 */
const validateUpdateTask = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean value"),

  // Custom validation to ensure at least one field is provided
  body().custom((value, { req }) => {
    if (!req.body.title && req.body.completed === undefined) {
      throw new Error(
        "At least one field (title or completed) must be provided"
      );
    }
    return true;
  }),

  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateTask,
  validateUpdateTask,
  handleValidationErrors,
};

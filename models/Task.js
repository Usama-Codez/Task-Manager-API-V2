const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must belong to a user"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for faster queries
taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ user: 1, title: 1 });

module.exports = mongoose.model("Task", taskSchema);

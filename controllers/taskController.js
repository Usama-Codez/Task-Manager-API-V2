const Task = require("../models/Task");

/**
 * @desc    Get all tasks for logged in user
 * @route   GET /api/tasks
 * @query   {string} title - Optional: Filter tasks by title (case-insensitive)
 * @query   {boolean} completed - Optional: Filter by completion status
 * @access  Private
 */
const getAllTasks = async (req, res) => {
  try {
    const { title, completed } = req.query;

    // Build query object
    const query = { user: req.user.id };

    // Filter by title if provided
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    // Filter by completion status if provided
    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
      message: "Tasks retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @desc    Get a single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    // Make sure user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task retrieved successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @body    {string} title - Task title (required)
 * @body    {boolean} completed - Task completion status (optional, defaults to false)
 * @access  Private
 */
const createTask = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const task = await Task.create({
      title,
      completed: completed || false,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @body    {string} title - Task title (optional)
 * @body    {boolean} completed - Task completion status (optional)
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    // Make sure user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Not authorized to update this task",
      });
    }

    const { title, completed } = req.body;

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    // Make sure user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Not authorized to delete this task",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
      message: "Task deleted successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * @desc    Get task statistics for logged in user
 * @route   GET /api/stats
 * @access  Private
 */
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user.id });
    const completedTasks = await Task.countDocuments({
      user: req.user.id,
      completed: true,
    });
    const pendingTasks = totalTasks - completedTasks;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
      },
      message: "Statistics retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};

const { v4: uuidv4 } = require("uuid");

// In-memory storage for tasks with fixed IDs for testing
let tasks = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Learn Express",
    completed: false,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "Build REST API",
    completed: false,
  },
];

/**
 * Get all tasks or filter by title
 * @route GET /api/tasks
 * @query {string} title - Optional: Filter tasks by title (case-insensitive)
 */
const getAllTasks = (req, res) => {
  try {
    const { title } = req.query;

    let filteredTasks = tasks;

    // Filter by title if query parameter is provided
    if (title) {
      filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      data: filteredTasks,
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
 * Get a single task by ID
 * @route GET /api/tasks/:id
 */
const getTaskById = (req, res) => {
  try {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task retrieved successfully",
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
 * Create a new task
 * @route POST /api/tasks
 * @body {string} title - Task title (required)
 * @body {boolean} completed - Task completion status (optional, defaults to false)
 */
const createTask = (req, res) => {
  try {
    const { title, completed = false } = req.body;

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      completed,
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask,
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
 * Update an existing task
 * @route PUT /api/tasks/:id
 * @body {string} title - Task title (optional)
 * @body {boolean} completed - Task completion status (optional)
 */
const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    // Update only provided fields
    if (title !== undefined) {
      tasks[taskIndex].title = title.trim();
    }
    if (completed !== undefined) {
      tasks[taskIndex].completed = completed;
    }

    res.status(200).json({
      success: true,
      data: tasks[taskIndex],
      message: "Task updated successfully",
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
 * Delete a task
 * @route DELETE /api/tasks/:id
 */
const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedTask,
      message: "Task deleted successfully",
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
 * Get task statistics
 * @route GET /api/stats
 */
const getTaskStats = (req, res) => {
  try {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
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

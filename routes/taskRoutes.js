const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const {
  validateTask,
  validateTaskUpdate,
} = require("../middlewares/validateTask");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID for the task
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         title:
 *           type: string
 *           description: The title of the task
 *           example: "Learn Express"
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *           example: false
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *         message:
 *           type: string
 *           example: "Operation successful"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         data:
 *           type: null
 *           example: null
 *         message:
 *           type: string
 *           example: "Error message"
 *     TaskStats:
 *       type: object
 *       properties:
 *         totalTasks:
 *           type: integer
 *           example: 10
 *         completedTasks:
 *           type: integer
 *           example: 5
 *         pendingTasks:
 *           type: integer
 *           example: 5
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks or filter by title
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter tasks by title (case-insensitive)
 *         example: "learn"
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Tasks retrieved successfully"
 *             example:
 *               success: true
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   title: "Learn Express"
 *                   completed: false
 *                 - id: "987e6543-e21b-12d3-a456-426614174001"
 *                   title: "Build REST API"
 *                   completed: true
 *               message: "Tasks retrieved successfully"
 */
router.get("/", getAllTasks);

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get task statistics
 *     description: Retrieve statistics about total, completed, and pending tasks
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TaskStats'
 *                 message:
 *                   type: string
 *                   example: "Statistics retrieved successfully"
 *             example:
 *               success: true
 *               data:
 *                 totalTasks: 10
 *                 completedTasks: 6
 *                 pendingTasks: 4
 *               message: "Statistics retrieved successfully"
 */
router.get("/stats", getTaskStats);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a single task by its UUID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the task
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task retrieved successfully"
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Learn Express"
 *                 completed: false
 *               message: "Task retrieved successfully"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               data: null
 *               message: "Task not found"
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Add a new task to the list
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Learn Swagger"
 *               completed:
 *                 type: boolean
 *                 description: Task completion status (optional, defaults to false)
 *                 example: false
 *           examples:
 *             newTask:
 *               summary: Create a new task
 *               value:
 *                 title: "Learn Swagger"
 *                 completed: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *             example:
 *               success: true
 *               data:
 *                 id: "456e7890-e12b-12d3-a456-426614174002"
 *                 title: "Learn Swagger"
 *                 completed: false
 *               message: "Task created successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               data: null
 *               message: "Title is required"
 */
router.post("/", validateTask, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the task
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *                 example: "Learn Express.js Advanced"
 *               completed:
 *                 type: boolean
 *                 description: Updated completion status
 *                 example: true
 *           examples:
 *             updateTitle:
 *               summary: Update task title
 *               value:
 *                 title: "Learn Express.js Advanced"
 *             updateCompleted:
 *               summary: Mark task as completed
 *               value:
 *                 completed: true
 *             updateBoth:
 *               summary: Update both fields
 *               value:
 *                 title: "Master Express.js"
 *                 completed: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Learn Express.js Advanced"
 *                 completed: true
 *               message: "Task updated successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               data: null
 *               message: "Task not found"
 */
router.put("/:id", validateTaskUpdate, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from the list by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the task to delete
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *             example:
 *               success: true
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Learn Express"
 *                 completed: false
 *               message: "Task deleted successfully"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               data: null
 *               message: "Task not found"
 */
router.delete("/:id", deleteTask);

module.exports = router;

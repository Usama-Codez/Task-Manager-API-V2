const express = require("express");
const router = express.Router();
const { getTaskStats } = require("../controllers/taskController");

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
 *                   type: object
 *                   properties:
 *                     totalTasks:
 *                       type: integer
 *                       example: 10
 *                     completedTasks:
 *                       type: integer
 *                       example: 6
 *                     pendingTasks:
 *                       type: integer
 *                       example: 4
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

module.exports = router;

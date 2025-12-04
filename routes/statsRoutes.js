const express = require("express");
const router = express.Router();
const { getTaskStats } = require("../controllers/taskController");
const { protect } = require("../middlewares/auth");

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get task statistics for authenticated user
 *     description: Retrieve statistics about total, completed, and pending tasks for logged in user
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/stats", protect, getTaskStats);

module.exports = router;

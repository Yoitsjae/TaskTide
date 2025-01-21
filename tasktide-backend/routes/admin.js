const express = require("express");
const router = express.Router();
const { broadcastTaskUpdate } = require("../websockets");

// Approve a task
router.post("/task/:id/approve", (req, res) => {
  const taskId = req.params.id;

  // Approve the task in the database
  const task = approveTask(taskId); // Replace with actual DB logic
  if (task) {
    broadcastTaskUpdate(task); // Notify WebSocket clients
    res.status(200).json({ message: "Task approved", task });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Reject a task
router.post("/task/:id/reject", (req, res) => {
  const taskId = req.params.id;

  // Reject the task in the database
  const task = rejectTask(taskId); // Replace with actual DB logic
  if (task) {
    broadcastTaskUpdate(task); // Notify WebSocket clients
    res.status(200).json({ message: "Task rejected", task });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

module.exports = router;

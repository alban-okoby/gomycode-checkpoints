const express = require("express");

const {
  createTask,
  getTasks,
  deleteTask
} = require("../controllers/taskController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.post("/tasks", createTask);

router.get("/tasks", getTasks);

router.delete("/tasks/:id", deleteTask);

module.exports = router;
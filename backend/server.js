const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: "Finish homework", completed: false },
  { id: 2, text: "Build task manager app", completed: true }
];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Task text is required" });
  }

  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task completion
app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { completed } = req.body;

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = completed;
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter(t => t.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
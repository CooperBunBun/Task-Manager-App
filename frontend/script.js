const API_URL = "http://localhost:3000/tasks";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => toggleTask(task));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);
  });
}

async function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  taskInput.value = "";
  fetchTasks();
}

async function toggleTask(task) {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed: !task.completed })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

fetchTasks();
// Connect to the WebSocket server
const socket = new WebSocket("ws://localhost:5000");

// Log connection status
socket.onopen = () => {
  console.log("WebSocket connection established.");
};

// Handle incoming messages
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Handle different types of WebSocket events
  switch (data.type) {
    case "TASK_UPDATED":
      updateTaskInTable(data.task);
      break;
    case "TASK_APPROVED":
      notifyAdmin("Task Approved", data.task.id);
      break;
    case "TASK_REJECTED":
      notifyAdmin("Task Rejected", data.task.id);
      break;
    default:
      console.log("Unknown WebSocket event:", data);
  }
};

// Handle WebSocket errors
socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

// Handle WebSocket connection closure
socket.onclose = () => {
  console.warn("WebSocket connection closed.");
};

// Update task in the tasks table
function updateTaskInTable(task) {
  const taskRow = document.getElementById(`task-${task.id}`);
  if (taskRow) {
    taskRow.querySelector(".task-status").textContent = task.status;
  }
}

// Notify admin about a task update
function notifyAdmin(message, taskId) {
  alert(`${message}: Task ID ${taskId}`);
}

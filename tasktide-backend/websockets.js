const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5001 });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  // Broadcast updates to all connected clients
  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  ws.on("close", () => {
    console.log("Client disconnected from WebSocket");
  });
});

// Function to broadcast a task update
function broadcastTaskUpdate(task) {
  const payload = JSON.stringify({
    type: "TASK_UPDATED",
    task,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// Export the broadcast function
module.exports = { broadcastTaskUpdate };

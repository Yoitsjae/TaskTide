const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes"); // Admin routes
const WebSocket = require("ws");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Admin Routes
app.use("/api/admin", adminRoutes);

// WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("message", (message) => {
    console.log("Received message:", message);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

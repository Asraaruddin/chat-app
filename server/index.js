const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// ✅ Corrected "connection" spelling
const io = socketIo(server, {
  cors: {
    origin: "*", // Later, replace with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for message event from clients
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

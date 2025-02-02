const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { initSocket } = require("./socket");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const findPeerRoutes = require("./routes/findPeerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend Vite default port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initSocket(server);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/auth", authRoutes);
app.use("/find", findPeerRoutes);
app.use("/profile", profileRoutes);
app.use("/request", connectionRoutes);
app.use("/messages", messagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

// Handle server shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});

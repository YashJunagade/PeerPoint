const { Server } = require("socket.io");
const Message = require("./models/Message");

let io;
const userSockets = new Map();

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("user_connected", (userId) => {
      if (!userId) return;
      socket.userId = userId;
      userSockets.set(userId, socket.id);

      // Broadcast updated online users to all clients
      const onlineUsers = Array.from(userSockets.keys());
      io.emit("online_users", onlineUsers);

      console.log(`User ${userId} connected. Online users: ${onlineUsers}`);
    });

    socket.on("send_message", async (data) => {
      try {
        const { receiverId, content } = data;
        const senderId = socket.userId;

        if (!senderId || !receiverId || !content?.trim()) {
          socket.emit("error", { message: "Invalid message data" });
          return;
        }

        const message = new Message({
          sender: senderId,
          receiver: receiverId,
          content: content.trim(),
          timestamp: new Date(),
        });

        const savedMessage = await message.save();
        console.log("Message saved:", savedMessage);

        // Send to receiver if online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", {
            message: savedMessage,
          });
          console.log(`Message sent to receiver ${receiverId}`);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", {
          message: "Failed to send message",
          details: error.message,
        });
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        userSockets.delete(socket.userId);

        // Broadcast updated online users after disconnect
        const onlineUsers = Array.from(userSockets.keys());
        io.emit("online_users", onlineUsers);

        console.log(
          `User ${socket.userId} disconnected. Online users: ${onlineUsers}`
        );
      }
    });
  });

  return io;
};

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?._id) return;

    // Initialize socket connection
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    // Set up connection event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected");
      // Emit user_connected event with user ID
      newSocket.emit("user_connected", user._id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Store socket instance
    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user?._id]); // Reconnect if user ID changes

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default useSocket;

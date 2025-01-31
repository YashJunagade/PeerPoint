import React, { useState, useEffect } from "react";
import { Camera, Send, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { messengerAPI } from "../utils/api";

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch connections on component mount
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await messengerAPI.getPendingRequests();
        setConnections(response.data.connections || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await messengerAPI.getMessages(selectedChat.id);
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  const ChatList = () => (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full sm:w-1/3 border-r bg-white p-4 h-[calc(100vh-64px)] sm:h-full"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />
        <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-gray-500">
            Loading connections...
          </div>
        ) : connections.length === 0 ? (
          <div className="text-center text-gray-500">No connections found</div>
        ) : (
          connections.map((connection, index) => (
            <motion.div
              key={connection._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedChat(connection)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="text-blue-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{connection.name}</h4>
                <p className="text-sm text-gray-600 truncate">
                  {connection.email}
                </p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Connected
              </span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );

  const ChatView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col h-[calc(100vh-64px)] sm:h-full bg-white"
    >
      {selectedChat ? (
        <>
          <div className="bg-white p-4 border-b">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <Camera className="text-blue-600" size={18} />
              </motion.div>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-sm text-gray-600">{selectedChat.email}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{message.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-4 border-t">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </motion.button>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a connection to start chatting
        </div>
      )}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white flex flex-col sm:flex-row lg:border-t-gray-500 border border-t-1">
        <AnimatePresence mode="wait">
          {(!isMobileView || !selectedChat) && <ChatList />}
          {(!isMobileView || selectedChat) && <ChatView />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Messenger;

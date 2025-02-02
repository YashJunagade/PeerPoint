import React, { useState, useEffect, useRef } from "react";
import { Send, Search, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { messengerAPI } from "../utils/api";
import { useUser } from "../store/UserContext";
import { useSocket } from "../store/UseSocket";

const Messenger = () => {
  const { socket } = useSocket();
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastMessageLengthRef = useRef(messages.length);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch initial connections
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await messengerAPI.getConversations();
        setConnections(response.data.connections || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
        setIsLoading(false);
      }
    };
    fetchConnections();
  }, []);

  // Handle message receiving
  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = ({ message }) => {
      if (selectedChat && selectedChat._id === message.sender) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, selectedChat]);

  // Fetch messages when chat is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?._id) return;
      try {
        setIsLoading(true);
        const response = await messengerAPI.getMessages(selectedChat._id);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  // Keep input focused
  useEffect(() => {
    if (selectedChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedChat, newMessage]);

  // Scroll to bottom only when new messages are added
  useEffect(() => {
    if (
      chatContainerRef.current &&
      messages.length > lastMessageLengthRef.current
    ) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    lastMessageLengthRef.current = messages.length;
  }, [messages]);

  // Handle input changes without triggering scroll
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat?._id || !socket || !user?._id)
      return;
    const messageData = {
      receiverId: selectedChat._id,
      content: newMessage,
    };
    const tempMessage = {
      _id: Date.now().toString(),
      sender: user._id,
      receiver: selectedChat._id,
      content: newMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    socket.emit("send_message", messageData);

    // Maintain focus after sending
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const ChatList = React.memo(() => (
    <div className="w-full sm:w-1/3 border-r bg-white p-4 h-[calc(100vh-64px)] sm:h-full">
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
          connections.map((connection) => (
            <div
              key={connection._id}
              onClick={() => setSelectedChat(connection)}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChat?._id === connection._id ? "bg-gray-50" : ""
              }`}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {connection.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{connection.name}</h4>
                <p className="text-sm text-gray-600 truncate">
                  {connection.email}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ));

  const ChatView = React.memo(() => (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] sm:h-full bg-gray-50">
      {selectedChat ? (
        <>
          {/* Header */}
          <div className="bg-white p-4 border-b shadow-sm">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-lg">
                  {selectedChat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {selectedChat.name}
                </h3>
              </div>
            </div>
          </div>
          {/* Chat Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50"
          >
            {messages.map((message, index) => {
              const isUserMessage = message.sender === user?._id;
              const showAvatar =
                !isUserMessage &&
                (index === 0 || messages[index - 1].sender !== message.sender);
              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-2 ${
                    isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar for receiver messages */}
                  {!isUserMessage && showAvatar ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                      <span className="text-white text-sm font-medium">
                        {selectedChat.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ) : !isUserMessage ? (
                    <div className="w-8 flex-shrink-0" />
                  ) : null}
                  {/* Message Bubble */}
                  <div
                    className={`group relative max-w-[75%] ${
                      isUserMessage ? "ml-12" : "mr-12"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl break-words ${
                        isUserMessage
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {/* Timestamp and Status */}
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isUserMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="text-gray-500">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Input Area */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                ref={inputRef}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                autoComplete="off"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send
                  size={20}
                  className="-rotate-45 translate-x-0.5 -translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
          <p className="text-lg font-medium">
            Select a chat to start messaging
          </p>
        </div>
      )}
    </div>
  ));

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white flex flex-col sm:flex-row lg:border-t-gray-500 border border-t-1">
        {isMobileView ? (
          selectedChat ? (
            <ChatView />
          ) : (
            <ChatList />
          )
        ) : (
          <>
            <ChatList />
            <ChatView />
          </>
        )}
      </div>
    </>
  );
};

export default Messenger;

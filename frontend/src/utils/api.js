// utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const connectionAPI = {
  // Connection requests
  getPendingRequests: () => api.get("/request/pending"),
  sendRequest: (receiverId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return api.post("/request/send", {
      receiverId,
      sender: user._id,
    });
  },
  respondToRequest: (requestId, status) =>
    api.post("/request/respond", { requestId, status }),
};

export const peerAPI = {
  // Peer-related endpoints
  getAllPeers: () => api.get("/find/peers"),
  getPeerById: (id) => api.get(`/find/peers/${id}`),
};
export const messengerAPI = {
  // Get all messages for a conversation
  getMessages: (userId) => api.get(`/messages/${userId}`),

  // Get list of conversations
  getConversations: () => api.get("/messages"),

  // Send a new message
  sendMessage: (receiverId, content) =>
    api.post("/messages", { receiverId, content }),

  // Mark message as read
  markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
};

export default api;

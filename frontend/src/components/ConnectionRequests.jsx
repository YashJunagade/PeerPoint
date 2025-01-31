import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { connectionAPI } from "../utils/api";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setIsLoading(true);
      const response = await connectionAPI.getPendingRequests();
      setRequests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load connection requests");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = async (requestId, status) => {
    try {
      await connectionAPI.respondToRequest(requestId, status);
      await fetchPendingRequests(); // Refresh the list
      toast.success(`Request ${status} successfully`);
    } catch (error) {
      console.error("Error responding to request:", error);
      toast.error("Failed to respond to request");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Bell size={24} />
        {!isLoading && requests.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {requests.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Connection Requests</h3>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : requests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No pending requests
              </p>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {request.sender?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {request.sender?.email || "No email"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResponse(request._id, "accepted")}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleResponse(request._id, "rejected")}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;

import { useEffect, useState } from "react";
import { Camera, Send, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { connectionAPI, peerAPI } from "../utils/api";
import toast from "react-hot-toast";

export const FindPeer = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setIsLoading(true);
      const userStr = localStorage.getItem("user");
      const currentUser = userStr ? JSON.parse(userStr) : null;

      if (!currentUser) {
        toast.error("Please log in to view mentors");
        return;
      }

      // Get the user's connections array
      const userConnections = currentUser.connections || [];

      // Fetch all peers
      const mentorsResponse = await peerAPI.getAllPeers();

      // Filter out:
      // 1. The logged-in user
      // 2. Users who are in the connections array
      const filteredMentors = mentorsResponse.data.filter(
        (mentor) =>
          mentor._id !== currentUser._id &&
          !userConnections.includes(mentor._id)
      );

      setMentors(filteredMentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to load mentors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (mentorId) => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast.error("Please log in to connect with mentors");
        return;
      }

      await connectionAPI.sendRequest(mentorId);
      toast.success("Connection request sent successfully!");

      // Refresh the mentor list to remove the newly connected mentor
      await fetchMentors();
    } catch (error) {
      console.error("Error sending connection request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send connection request";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:border-t-gray-500 border-1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search mentors by name, university, or expertise..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
            </motion.button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                Loading mentors...
              </div>
            ) : mentors.length > 0 ? (
              mentors
                .filter((mentor) =>
                  [mentor.name, mentor.university, mentor.college].some(
                    (field) =>
                      field?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((mentor, index) => (
                  <motion.div
                    key={mentor._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-600"
                      >
                        <span className="text-white text-lg font-semibold">
                          {mentor.name
                            ? mentor.name.charAt(0).toUpperCase()
                            : ""}
                        </span>
                      </motion.div>
                      <div>
                        <h3 className="font-semibold">
                          <Link
                            to={`/Profile/${mentor._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {mentor.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {mentor.university}
                        </p>
                        <p className="text-sm text-gray-600">
                          {mentor.college}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        {mentor.expertise?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 sm:px-3 mx-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {mentor.rating > 0 && `⭐ ${mentor.rating}`}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => handleConnect(mentor._id)}
                        >
                          Connect
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">
                No mentors found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPeer;

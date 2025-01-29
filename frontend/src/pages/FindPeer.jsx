import { Camera, Send, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export const FindPeer = () => {
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
            {[1, 2, 3, 4, 5, 6].map((mentor, index) => (
              <motion.div
                key={mentor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <Camera className="text-blue-600" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Mentor Name</h3>
                    <p className="text-sm text-gray-600">IIT Mumbai</p>
                    <p className="text-sm text-gray-600">Computer Science</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Expertise in: Data Structures, Algorithms, Web Development
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      ⭐ 4.8 (24 reviews)
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Connect
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPeer;

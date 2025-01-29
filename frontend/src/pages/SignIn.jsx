import { motion } from "framer-motion";

const SignIn = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white pt-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              Welcome Back
            </h2>

            <div className="space-y-5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-gray-600"
            >
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

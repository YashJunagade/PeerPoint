import { motion } from "framer-motion";

const SignUp = () => {
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
              Create Account
            </h2>

            <div className="space-y-5">
              {[
                { placeholder: "Full Name", type: "text", delay: 0.3 },
                { placeholder: "Email", type: "email", delay: 0.4 },
                { placeholder: "Password", type: "password", delay: 0.5 },
              ].map((input, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: input.delay }}
                >
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="">Select Role</option>
                  <option value="seeker">Student (Seeking Help)</option>
                  <option value="mentor">Senior (Helping Others)</option>
                </select>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center text-gray-600"
            >
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 hover:underline">
                Sign In
              </a>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

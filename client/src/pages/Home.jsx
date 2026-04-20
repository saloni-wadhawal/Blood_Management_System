import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-red-600"
      >
        Find Blood Donors Easily 🩸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 mb-6 text-center max-w-md"
      >
        Connect with nearby blood donors quickly and save lives.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        Get Started
      </motion.button>
    </div>
  );
}
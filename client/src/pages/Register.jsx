import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  try {
    setLoading(true);

    await axios.post("http://localhost:5000/api/auth/register", form);

    toast.success("Registered Successfully 🎉");

    navigate("/");

  } catch (err) {
    toast.error("Registration Failed ❌");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
          🩸 Create Account
        </h2>

        <input
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
     
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleRegister}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold"
        >
          Register
        </motion.button> */}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg"
        >
       {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-purple-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Clear form on load (fix autofill issue)
  useEffect(() => {
    setForm({ email: "", password: "" });
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Login
  
const handleLogin = async () => {
  if (!form.email || !form.password) {
    toast.error("Please fill all fields ⚠️");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login Successful 🎉");

    navigate("/dashboard");

  } catch (err) {
    toast.error("Invalid credentials ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
          🩸 BloodConnect Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={form.email}
          autoComplete="off"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-400"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          value={form.password}
          autoComplete="new-password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-red-400"
        />

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
        >
         {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* REGISTER */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-500 cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>

      </motion.div>
    </div>
  );
}
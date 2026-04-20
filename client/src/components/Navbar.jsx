import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();   // ✅ CLEAR EVERYTHING
    window.location.href = "/";  // ✅ FORCE REDIRECT
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50"
    >
      {/* 🩸 Logo */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer tracking-wide"
      >
        🩸 BloodConnect
      </h1>

      {/* 🔗 Links */}
      <div className="flex items-center gap-6">

        <Link to="/dashboard" className="hover:text-gray-200 transition">
          Dashboard
        </Link>

        <Link to="/add-donor" className="hover:text-gray-200 transition">
          Add Donor
        </Link>

        <Link to="/donors" className="hover:text-gray-200 transition">
          Find Donors
        </Link>

        <button onClick={() => navigate("/request-blood")}>
           Request Blood
        </button>

        {/* 👤 User */}
        <span className="hidden md:block text-sm opacity-90">
          Hi, {user?.name}
        </span>

        {/* 🚪 Logout */}
        <button
          onClick={handleLogout}
          className="bg-white text-red-500 px-3 py-1 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Logout
        </button>

      </div>
    </motion.nav>
  );
}
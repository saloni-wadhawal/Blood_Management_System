import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🔥 IMPORT THESE
import Sidebar from "../components/Sidebar";


export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    requests: 0,
  });

  // 🔥 Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/donors/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.clear();   // ✅ CLEAR EVERYTHING
  window.location.href = "/";  // ✅ FORCE REDIRECT
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // navigate("/");
  };

  return (
    <div className="flex">

      {/* 🔥 SIDEBAR */}
      <Sidebar />

      {/* 🔥 MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* 📄 CONTENT */}
        <div className="flex-1 p-6 bg-gray-100">

          {/* 👋 Welcome */}
          <h1 className="text-3xl font-bold mb-2">
            Welcome {user?.name} 👋
          </h1>

          <p className="text-gray-600 mb-6">
            Blood Management System 🩸
          </p>

          {/* 📊 STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            <motion.div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-gray-500">Total Donors</h3>
              <p className="text-2xl font-bold text-blue-600">
                {stats.total}
              </p>
            </motion.div>

            <motion.div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-gray-500">Available</h3>
              <p className="text-2xl font-bold text-green-600">
                {stats.available}
              </p>
            </motion.div>

            {/* <motion.div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-gray-500">Requests</h3>
              <p className="text-2xl font-bold text-red-500">
                {stats.requests}
              </p>
            </motion.div> */}

          </div>

          {/* 🚀 ACTION BUTTONS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => navigate("/add-donor")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Donor
            </button>

            <button
              onClick={() => navigate("/donors")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              View Donors
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {/* 📍 MAP */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-3">
              📍 Nearby Hospitals
            </h2>

            <iframe
              title="map"
              src="https://www.google.com/maps?q=hospitals+in+Pune&output=embed"
              className="w-full h-80 rounded-lg border"
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* 🔥 FOOTER */}
        

      </div>

    </div>
  );
}

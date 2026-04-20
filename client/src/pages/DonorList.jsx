import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// 🔥 IMPORT THESE
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDonors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donors?bloodGroup=${bloodGroup}&city=${city}`
      );
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [bloodGroup, city]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return (
    <div className="flex">

      {/* 🔥 SIDEBAR */}
      <Sidebar />

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* 📄 CONTENT */}
        <div className="flex-1 bg-gray-100 p-6">

          {/* 🔍 TITLE */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 text-red-600"
          >
            🔍 Find Donors
          </motion.h2>

          {/* 🔎 FILTERS */}
          <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              placeholder="Blood Group (A+, B+...)"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={fetchDonors}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearch("");
                setBloodGroup("");
                setCity("");
                setTimeout(() => fetchDonors(), 0);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Reset
            </button>
          </div>

          {/* 📋 DONORS */}
          {loading ? (
            <p className="animate-pulse text-gray-500">Loading donors...</p>
          ) : donors.length === 0 ? (
            <p>No donors found 😔</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {donors.map((d, index) => (
                <motion.div
                  key={d._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-5 rounded-2xl shadow-lg border"
                >
                  <h3 className="text-lg font-bold mb-2">{d.name}</h3>

                  <p>🩸 <b>Blood:</b> {d.bloodGroup}</p>
                  <p>📍 <b>City:</b> {d.city}</p>
                  <p>🎂 <b>Age:</b> {d.age}</p>
                  <p>⚧ <b>Gender:</b> {d.gender}</p>

                  <p>
                    🟢 <b>Status:</b>{" "}
                    {d.available ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </p>

                  {/* 📞 ACTIONS */}
                  <div className="mt-4 flex flex-col gap-2">

                    <a
                      href={`tel:${d.phone}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-center"
                    >
                      📞 Call Donor
                    </a>

                   <button
                    onClick={() => {
                     navigator.clipboard.writeText(d.phone);
                     toast.success("Number copied 📋");
                    }}
                    className="bg-green-500 text-white px-3 py-2 rounded"
                  >
                   📋 Copy Number
                  </button>    

                    <button
                      onClick={() => {
                       let fav = JSON.parse(localStorage.getItem("fav")) || [];
                        fav.push(d);
                        localStorage.setItem("fav", JSON.stringify(fav));

                      toast.success("Added to favorites ❤️");
                     }}
                    className="bg-pink-500 text-white px-3 py-2 rounded"
                  >
                    ❤️ Favorite
                  </button>

                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

        {/* 🔥 FOOTER */}
        

      </div>
    </div>
  );
}
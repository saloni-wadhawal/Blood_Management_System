import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// 🔥 IMPORT
import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function AddDonor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
    age: "",
    gender: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:5000/api/donors", form);

    // ✅ SUCCESS TOAST
    toast.success("Donor Added Successfully 🎉");

    // reset form
    setForm({
      name: "",
      bloodGroup: "",
      phone: "",
      city: "",
      age: "",
      gender: "",
      available: true,
    });

  } catch (err) {
    console.log(err);

    // ❌ ERROR TOAST
    toast.error("Error adding donor ❌");
  }
};
  return (
    <div className="flex">

      {/* 🔥 SIDEBAR */}
      <Sidebar />

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">

        {/* 📄 CONTENT */}
        <div className="flex-1 flex justify-center items-center p-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
              🩸 Add New Donor
            </h2>

            <div className="space-y-4">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              />

              <input
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group (A+, B+...)"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              />

              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                type="number"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              />

              {/* Gender */}
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              {/* Availability */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                />
                Available for donation
              </label>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                ➕ Add Donor
              </motion.button>

            </div>
          </motion.div>

        </div>

        {/* 🔥 FOOTER */}
        {/* <Footer /> */}

      </div>
    </div>
  );
}
import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";


export default function RequestForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/request",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request Sent Successfully ✅");
    //  toast.success("Request Sent Successfully ✅");
    
      // Reset form
      setForm({
        patientName: "",
        bloodGroup: "",
        city: "",
        phone: "",
      });

      // 🔥 Optional redirect (recommended)
      navigate("/requests");

    } catch (error) {
      console.error(error);
      alert("Error sending request ❌");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
            🩸 Request Blood
          </h2>

          {/* Patient Name */}
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          {/* Blood Group */}
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Send Request
          </button>
            
        </form>
          
      </div>
    </Layout>
       
  ); 
   

}
 
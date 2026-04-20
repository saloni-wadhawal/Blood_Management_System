import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate(); // 🔥 navigation

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🩸 Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            🩸 BloodConnect
          </h2>
          <p className="text-sm leading-relaxed">
            Connecting donors with patients instantly.  
            Helping save lives with technology ❤️
          </p>
        </div>

        {/* 🔗 Quick Links (FIXED) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            
            <li 
              onClick={() => navigate("/dashboard")}
              className="hover:text-red-400 cursor-pointer transition"
            >
              Dashboard
            </li>

            <li 
              onClick={() => navigate("/add-donor")}
              className="hover:text-red-400 cursor-pointer transition"
            >
              Add Donor
            </li>

            <li 
              onClick={() => navigate("/donors")}
              className="hover:text-red-400 cursor-pointer transition"
            >
              Find Donors
            </li>

          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">📧 support@bloodconnect.com</p>
          <p className="text-sm">📞 +91 9876543210</p>
          <p className="text-sm">📍 Pune, India</p>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />
          </div>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} BloodConnect | Made with ❤️ for saving lives
      </div>

    </footer>
  );
}
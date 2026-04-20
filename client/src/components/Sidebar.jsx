import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 p-5">
      
      <h2 className="text-2xl font-bold mb-8 text-red-500">
        🩸 Blood Connect
      </h2>

      <div className="flex flex-col space-y-4">

        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          📊 Dashboard
        </Link>

        <Link to="/add-donor" className="hover:bg-gray-700 p-2 rounded">
          ➕ Add Donor
        </Link>

        <Link to="/donors" className="hover:bg-gray-700 p-2 rounded">
          👥 Donor List
        </Link>

        <Link to="/requests" className="hover:bg-gray-700 p-2 rounded">
          🩸 Requests
        </Link>

      </div>
    </div>
  );
}
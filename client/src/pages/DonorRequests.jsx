import { useEffect, useState } from "react";
import axios from "axios";

export default function DonorRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/request", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/request/accept",
      { requestId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRequests();
  };

  return (
    <div>
      <h2>Available Requests</h2>

      {requests.map((req) => (
        <div key={req._id}>
          <p>{req.patientName}</p>
          <p>{req.bloodGroup}</p>
          <p>{req.city}</p>

          <button onClick={() => acceptRequest(req._id)}>
            Accept Request
          </button>
        </div>
      ))}
    </div>
  );
}
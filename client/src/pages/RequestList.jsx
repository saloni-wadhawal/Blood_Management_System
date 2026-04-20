import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  // 🔄 Fetch requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Donor Accept API (NEW)
  const acceptRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/request/accept",
        { requestId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Show only pending + accepted (optional filter)
  const filteredRequests = requests.filter(
    (req) => req.status === "pending" || req.status === "accepted"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        🩸 Blood Requests
      </h1>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Name */}
              <h2 className="text-xl font-semibold mb-2">
                {req.patientName || req.name}
              </h2>

              {/* Details */}
              <p className="text-gray-700">
                🩸 <b>Blood Group:</b> {req.bloodGroup}
              </p>

              <p className="text-gray-700">
                📍 <b>City:</b> {req.location || req.city}
              </p>

              {/* Status */}
              <p className="mt-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full text-white ${
                    req.status === "accepted"
                      ? "bg-green-500"
                      : req.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {/* Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">

                {/* ✅ Accept only if pending */}
                {req.status === "pending" && (
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Accept
                  </button>
                )}

                {/* 📞 Call only after accepted */}
                {req.status === "accepted" && (
                  <button
                    onClick={() =>
                      window.open(
                        `tel:${req.acceptedDonor?.phone || req.phone}`
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    📞 Call
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function RequestList() {
//   const [requests, setRequests] = useState([]);

//   // Fetch requests
//   const fetchRequests = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/request", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setRequests(res.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Update status
//   const updateStatus = async (id, status) => {
//   try {
//     const token = localStorage.getItem("token");

//     await axios.patch(
//       `http://localhost:5000/api/request/${id}`,
//       { status: status.toLowerCase() },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     fetchRequests();
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//   <div className="min-h-screen bg-gray-100 p-6">

//     <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
//       🩸 Blood Requests
//     </h1>

//     {requests.length === 0 ? (
//       <p className="text-center text-gray-500">No requests found</p>
//     ) : (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

//         {requests.map((req) => (
//           <div
//             key={req._id}
//             className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
//           >
//             {/* Name */}
//             <h2 className="text-xl font-semibold mb-2">
//               {req.patientName || req.name}
//             </h2>

//             {/* Details */}
//             <p className="text-gray-700">
//               🩸 <b>Blood Group:</b> {req.bloodGroup}
//             </p>

//             <p className="text-gray-700">
//               📍 <b>City:</b> {req.location || req.city}
//             </p>

//             {/* Status Badge */}
//             <p className="mt-3">
//               <span
//                 className={`px-3 py-1 text-sm rounded-full text-white ${
//                   req.status === "accepted"
//                     ? "bg-green-500"
//                     : req.status === "rejected"
//                     ? "bg-red-500"
//                     : "bg-yellow-500"
//                 }`}
//               >
//                 {req.status}
//               </span>
//             </p>

//             {/* Buttons */}
//             <div className="mt-4 flex flex-wrap gap-2">

//               <button
//                 onClick={() => updateStatus(req._id, "accepted")}
//                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
//               >
//                 Accept
//               </button>

//               <button
//                 onClick={() => updateStatus(req._id, "rejected")}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
//               >
//                 Reject
//               </button>

//               <button
//                 onClick={() =>
//                   window.open(
//                     `tel:${req.phone || req.acceptedDonor?.phone}`
//                   )
//                 }
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
//               >
//                 📞 Call
//               </button>

//             </div>
//           </div>
//         ))}

//       </div>
//     )}
//   </div>
// );
// }

// // 🎨 Styles
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   card: {
//     backgroundColor: "white",
//     padding: "20px",
//     marginBottom: "15px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   buttonGroup: {
//     marginTop: "15px",
//     display: "flex",
//     gap: "10px",
//   },
//   btn: {
//     color: "white",
//     border: "none",
//     padding: "8px 15px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

import { isCompatible } from "../utils/bloodCompatibility.js";
import Request from "../models/Request.js";
import User from "../models/user.js";

// ✅ Create request + match donors
// export const createRequest = async (req, res) => {
//   try {
//     // 1. Save request
//     const newRequest = new Request(req.body);
//     await newRequest.save();

//     // 2. Find donors in same city
//     const donors = await User.find({
//       role: "donor",
//       city: req.body.city
//     });

//     // 3. Filter compatible donors
//     const matchedDonors = donors.filter((donor) =>
//       isCompatible(req.body.bloodGroup, donor.bloodGroup)
//     );

//     // 4. Send response
//     res.status(201).json({
//       message: "Request created successfully",
//       request: newRequest,
//       matchedDonors
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ✅ Update request status
export const createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();

    // 🔍 Step 1: Find donors in same city
    const donors = await User.find({
      role: "donor",
      city: req.body.city,
    });

    // 🔥 Step 2: Filter compatible donors
    const matchedDonors = donors.filter((donor) =>
      isCompatible(donor.bloodGroup, req.body.bloodGroup)
    );

    // ✅ Send response (for testing)
    res.json({
      message: "Request created successfully",
      totalDonors: donors.length,
      matchedDonorsCount: matchedDonors.length,
      matchedDonors, // 🔥 important
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export const updateRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     res.json({
//       message: "Request status updated",
//       request: updatedRequest
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const updateRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     res.json({
//       message: "Request status updated",
//       request: updatedRequest
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ✅ Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("acceptedDonor");  // 🔥 ADD THIS

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Accept request by donor/
// controllers/requestController.js

export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    request.acceptedDonor = req.user.id; // logged-in donor

    await request.save();

    res.json({ message: "Request accepted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const acceptRequest = async (req, res) => {
//   try {
//     // const { requestId, donorId } = req.body;
//    const { donorId } = req.body;
//    const requestId = req.params.id;
//    const request = await Request.findById(requestId);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     if (request.status === "accepted") {
//       return res.status(400).json({ message: "Request already accepted" });
//     }

//     request.status = "accepted";
//     request.acceptedDonor = donorId;

//     await request.save();

//     res.json({
//       message: "Request accepted",
//       request
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import User from "../models/user.js";
// // Create request
// import { isCompatible } from "../utils/bloodCompatibility.js";

// export const createRequest = async (req, res) => {
//   try {
//     // 1. Save request
//     const newRequest = new Request(req.body);
//     await newRequest.save();

//     // 2. Find donors in same city
//     const donors = await User.find({
//       role: "donor",
//       city: req.body.city
//     });

//     // 3. Filter compatible donors
//     const matchedDonors = donors.filter(donor =>
//       isCompatible(donor.bloodGroup, req.body.bloodGroup)
//     );
//     // 4. Send ONLY ONE response
//     res.status(201).json({
//       message: "Request created successfully",
//       request: newRequest,
//       matchedDonors
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// // export const createRequest = async (req, res) => {
// //   try {
// //     const request = new Request(req.body);
// //     await request.save();

// //     res.status(201).json({ message: "Request created", request });
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // };


// export const updateRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.id, // request ID from URL
//       { status },     // new status
//       { new: true }   // return updated document
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     res.json(updatedRequest);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// // Get all requests
// export const getRequests = async (req, res) => {
//   try {
//     const requests = await Request.find();
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // ✅ ADD THIS FUNCTION (Accept Request)
// export const acceptRequest = async (req, res) => {
//   try {
//     const { requestId, donorId } = req.body;

//     const request = await Request.findById(requestId);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     if (request.status === "accepted") {
//       return res.status(400).json({ message: "Request already accepted" });
//     }

//     request.status = "accepted";
//     request.acceptedDonor = donorId;

//     await request.save();

//     res.json({ message: "Request accepted", request });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
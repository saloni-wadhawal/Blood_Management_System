import express from "express";
import {
  createRequest,
  getRequests,
  updateRequestStatus,
  acceptRequest   // 🔥 ADD THIS
} from "../controllers/requestController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🩸 Create request (patient)
router.post("/", authMiddleware, createRequest);

// 📋 Get all requests
router.get("/", authMiddleware, getRequests);

// 🔥 Donor accepts request
router.post("/accept", authMiddleware, acceptRequest);

// 🔄 Admin / fallback status update
router.patch("/:id", authMiddleware, updateRequestStatus);

export default router;
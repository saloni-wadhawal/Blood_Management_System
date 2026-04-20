import express from "express";
import {
  addDonor,
  getDonors,
  getDonorsByBlood,
  getStats
} from "../controllers/donorController.js";

const router = express.Router();

// ✅ ADD DONOR
router.post("/", addDonor);

// ✅ GET STATS (⚠️ MUST BE ABOVE :bloodGroup)
router.get("/stats", getStats);

// ✅ GET ALL DONORS (with filter)
router.get("/", getDonors);

// ✅ FILTER BY BLOOD GROUP
router.get("/:bloodGroup", getDonorsByBlood);

export default router;
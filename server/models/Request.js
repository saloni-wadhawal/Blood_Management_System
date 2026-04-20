// models/Request.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  city: String,

  status: {
    type: String,
    default: "pending",
  },

  acceptedDonor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Request", requestSchema);
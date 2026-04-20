import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bloodGroup: String,

  role: {
    type: String,
    enum: ["donor", "patient", "admin"],
    default: "donor"
  },

  // ✅ NEW FIELDS
  phone: String,
  address: String,
  city: String,
  age: Number,
  gender: String,
  lastDonationDate: Date,
  notes: String,

  available: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
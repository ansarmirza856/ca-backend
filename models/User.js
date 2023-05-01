import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: Number,
  },
  resetPasswordExpires: {
    type: Date,
  },
  isAdmin: { type: Boolean, default: false },
  uTrNumber: { type: Number, required: true },
  nInumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  currentAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    town: { type: String },
    postCode: { type: String },
    county: { type: String },
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);

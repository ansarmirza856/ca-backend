import connectDB from "../../db";
import User from "../../models/User";

export default async function handler(req, res) {
  const { action, email, otp } = req.body;

  if (req.method === "POST") {
    try {
      await connectDB();

      if (!action || !email || !otp) {
        return res.status(400).json({ message: "Invalid request" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({success: false, message: `User not found. ${email}` });
      }

      if (action === "email-verification") {
        if (user.isEmailVerified) {
          return res.status(400).json({success: false, message: "Email already verified" });
        }

        if (user.otp !== otp) {
          return res.status(400).json({success: false, message: "Invalid OTP code" });
        }

        user.isEmailVerified = true;
        user.otp = "";
        await user.save();

        return res.status(200).json({success: true, message: "OTP verified successfully" });
      } else if (action === "reset-password") {
        if (user.resetPasswordToken !== otp) {
          return res.status(400).json({success: false, message: "Invalid OTP code" });
        }

        if (Date.now() > user.resetPasswordExpires) {
          return res.status(400).json({success: false, message: "OTP expired" });
        }

        user.resetPasswordToken = "";
        user.resetPasswordExpires = "";
        await user.save();

        return res.status(200).json({success: true, message: "OTP verified successfully" });
      } else {
        return res.status(400).json({success: false, message: "Invalid request" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Internal server error" });
    }
  } else {
    return res.status(400).json({success: false, message: "Invalid request" });
  }
}

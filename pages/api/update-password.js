import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "../../db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { email, password, confirmPassword } = req.body;
      connectDB();

      if (!email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Please fill all fields" });
      }

      // Check if the passwords match
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Passwords do not match" });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Find the user by their email address
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true, upsert: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error", error: error });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, error: "Invalid request method" });
  }
}

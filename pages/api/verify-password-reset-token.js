import connectDB from "../../db";
import User from "../../models/User";

export default async function handler(req, res) {
  const { token } = req.query;

  if (req.method === "GET") {
    try {
      await connectDB();

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      return res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request method" });
  }
}

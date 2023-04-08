import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;

    try {
      connectDB();
      // verify JWT and get user info
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
      const user = await User.findOne({ email });

      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}

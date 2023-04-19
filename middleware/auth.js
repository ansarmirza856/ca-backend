import jwt from "jsonwebtoken";
import User from "../models/User.js";
import connectDB from "../db";

const authMiddleware = (handler, requireAdmin = false) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "No token provided",
      });
    }

    try {
      connectDB();
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (requireAdmin && decoded.isAdmin == false) {
        return res.status(403).json({ success: false, error: "Forbidden" });
      }

      const userEmail = decoded.email;

      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User not found",
        });
      }

      if (user) {
        req.user = user;
      }

      return handler(req, res);
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized", message: error });
    }
  };
};

export default authMiddleware;

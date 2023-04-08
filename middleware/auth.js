import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = (handler, requireAdmin = false) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (requireAdmin && !decoded.isAdmin) {
        return res.status(403).json({ success: false, error: "Forbidden" });
      }

      const userEmail = decoded.email;

      const unixTimestampCre = decoded.iat;
      const date = new Date(unixTimestampCre * 1000).toUTCString();

      const unixTimestampUp = decoded.iat;
      const date1 = new Date(unixTimestampUp * 1000).toUTCString();

      const user = await User.findOne({ email: userEmail });

      if (user) {
        req.user = user;
      }

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
  };
};

export default authMiddleware;

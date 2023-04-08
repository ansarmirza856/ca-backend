import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const email = req.user.email;
      const getUserTaxApplications = await userTaxApplication
        .find({
          userEmail: email,
        })
        .sort({ dateSubmitted: "desc" });

      res.status(200).json({
        success: true,
        data: getUserTaxApplications,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

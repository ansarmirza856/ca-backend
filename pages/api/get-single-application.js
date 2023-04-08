import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();

    try {
      const { id } = req.query;
      const getApplication = await userTaxApplication.findOne({
        formId: id,
      });

      if (!getApplication)
        return res.status(404).json({ error: "Application not found" });

      res.status(200).json({
        success: true,
        data: getApplication,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}, true);

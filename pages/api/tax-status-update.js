import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    try {
      const { formId, ApprovedByUser } = req.body;

      const updateUserTaxApplication =
        await userTaxApplication.findOneAndUpdate(
          { formId: formId },
          { ApprovedByUser: ApprovedByUser },
          { new: true }
        );

      res.status(200).json({
        success: true,
        data: updateUserTaxApplication,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}, true);

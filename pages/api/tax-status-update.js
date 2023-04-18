import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    try {
      const { action } = req.body;

      if (action === "approve") {
        const { formId, ApprovedByUser } = req.body;

        const updateUserTaxApplication =
          await userTaxApplication.findOneAndUpdate(
            { formId: formId },
            {
              ApprovedByUser: ApprovedByUser,
              "amendmementRequest.requested": false,
              applicationStatus: "submitting",
            },
            { new: true }
          );

        res.status(200).json({
          success: true,
          data: updateUserTaxApplication,
        });
      } else if (action === "reject") {
        const { formId, ApprovedByUser, amendementMessage } = req.body;

        const updateUserTaxApplication =
          await userTaxApplication.findOneAndUpdate(
            { formId: formId },
            {
              ApprovedByUser: ApprovedByUser,
              "amendmementRequest.requested": true,
              "amendmementRequest.reason": amendementMessage,
              applicationStatus: "in process",
            },
            { new: true }
          );

        res.status(200).json({
          success: true,
          data: updateUserTaxApplication,
        });
      } else {
        res.status(400).json({ success: false, error: "No action found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
}, true);

import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    if (req.body === null) {
      return res.status(400).json({ error: "Payload should not be empty" });
    }

    try {
      const { formId } = req.body;
      const getApplication = await userTaxApplication.findOne({
        formId: formId,
      });

      if (!getApplication) {
        return res.status(404).json({ error: "No application found" });
      }

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
});

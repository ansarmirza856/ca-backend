import connectDB from "../../db";
import PersonalEmployment from "@/models/PersonalEmployment";
import userTaxApplication from "@/models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    if (req.body === null) {
      return res.status(400).json({ error: "Payload should not be empty" });
    }

    try {
      const { formId } = req.body;
      const savedPersonalEmployments =
        await userTaxApplication.findOneAndUpdate({ formId }, req.body, {
          new: true,
          upsert: true,
        });
      res.status(200).json(savedPersonalEmployments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

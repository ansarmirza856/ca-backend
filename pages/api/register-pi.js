import connectDB from "../../db";
import authMiddleware from "../../middleware/auth";
import userTaxApplication from "@/models/UserTaxApplication";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    if (req.body === null) {
      return res.status(400).json({ error: "Payload should not be empty" });
    }

    try {
      const { formId } = req.body;
      const savedPersonalInformation =
        await userTaxApplication.findOneAndUpdate(
          { formId },
          {
            pi: 1,
            applicationStatus: "in process",
            ...req.body,
          },
          {
            new: true,
            upsert: true,
          }
        );
      res.status(200).json(savedPersonalInformation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

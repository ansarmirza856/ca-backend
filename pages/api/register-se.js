import connectDB from "../../db";
import { v4 as uuidv4 } from "uuid";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      let formId = req.body.formId;

      if (formId === "generate_new_id") {
        formId = "CA-" + uuidv4().substring(0, 16);
      }

      const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
        { formId: formId },
        {
          applicationStatus: "pending",
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          userEmail: req.user.email,
          dateSubmitted: new Date(),
          ...req.body,
        },
        { new: true, upsert: true }
      );
      res.status(200).json({ success: true, formId, savedSelfEmployments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

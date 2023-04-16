import connectDB from "../../db";
import { v4 as uuidv4 } from "uuid";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const uniqueId = "CA-" + uuidv4().substring(0, 16);

      let { formId } = req.body;

      if (!formId || formId === "") {
        formId = uniqueId;
      }

      const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
        { formId: formId },
        {
          formId: formId,
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

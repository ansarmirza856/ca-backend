import connectDB from "../../db";
import { v4 as uuidv4 } from "uuid";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();

      let newFormId = "";

      const uniqueId = "CA-" + uuidv4().substring(0, 16);

      newFormId = req.body.formId;

      if (!newFormId || newFormId === "") {
        newFormId = uniqueId;
      }

      const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
        { formId: newFormId },
        {
          formId: newFormId,
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

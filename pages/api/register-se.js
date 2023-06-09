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

      if (
        req.body.formId &&
        typeof req.body.formId === "string" &&
        req.body.formId.trim() !== ""
      ) {
        newFormId = req.body.formId.trim();
      } else {
        newFormId = uniqueId;
      }

      const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
        { formId: newFormId },
        {
          applicationStatus: "pending",
          firstName: req.user.firstName,
          surName: req.user.surName,
          userEmail: req.user.email,
          dateSubmitted: new Date(),
          ...req.body,
          formId: newFormId,
        },
        { new: true, upsert: true }
      );
      res.status(200).json({ success: true, newFormId, savedSelfEmployments });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal server error", ExactError: error });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

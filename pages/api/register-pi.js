import connectDB from "../../db";
import authMiddleware from "../../middleware/auth";
import userTaxApplication from "@/models/UserTaxApplication";
import User from "@/models/User";

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

      const updateUser = await User.findOneAndUpdate(
        { email: req.user.email },
        {
          uTrNumber: req.body.personalInformation[0].uTrNumber,
          nInumber: req.body.personalInformation[0].nInumber,
          currentAddress: req.body.personalInformation[0].currentAddress,
          surName: req.body.personalInformation[0].surName,
        }
      );

      res.status(200).json(savedPersonalInformation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", error: error });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

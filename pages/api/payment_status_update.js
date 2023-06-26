import connectDB from "../../db";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    if (req.body === null) {
      return res
        .status(400)
        .json({ success: false, error: "Payload should not be empty" });
    }

    const getUserApplication = await userTaxApplication.findOne({
      formId: req.body.formId,
    });

    if (!getUserApplication) {
      return res.status(404).json({ success: false, error: "No form found" });
    }

    const { formId, accountancyFee, firstName, lastName, userEmail } =
      getUserApplication;

    try {
      await userTaxApplication.findOneAndUpdate(
        { formId: req.body.formId },
        {
          paymentIntent: req.body.paidWith,
          paymentStatus: req.body.paymentStatus,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        formId: formId,
        accountancyFee: accountancyFee,
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error", log: error });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

import connectDB from "../../db";
import { v4 as uuidv4 } from "uuid";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";
import Stripe from "stripe";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    //add stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    const amount = Number(accountancyFee * 100);

    try {
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "gbp",
        payment_method_types: ["card"],
        receipt_email: userEmail,
        metadata: {
          formId: formId,
          firstName: firstName,
          lastName: lastName,
          userEmail: userEmail,
        },
      });

      const client_secret = paymentIntent.client_secret;

      const updatedUserApplication = await userTaxApplication.findOneAndUpdate(
        { formId: req.body.formId },
        { paymentIntent: client_secret, paymentStatus: "in process" },
        { new: true }
      );

      res.status(200).json({
        success: true,
        paymentIntent: client_secret,
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

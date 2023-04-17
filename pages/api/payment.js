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

    try {
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: accountancyFee * 100,
        currency: "gbp",
        payment_method_types: ["card"],
        receipt_email: userEmail,
      });

      res.status(200).json({
        success: true,
        paymentIntent: paymentIntent.client_secret,
        formId: formId,
        accountancyFee: accountancyFee,
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
      });

      //save payment intent id to db
      //   const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
      //     { formId: newFormId },
      //     { paymentIntentId: paymentIntent.id },
      //     { new: true, upsert: true }
      //   );
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

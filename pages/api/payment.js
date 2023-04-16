import connectDB from "../../db";
import { v4 as uuidv4 } from "uuid";
import userTaxApplication from "../../models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";
import Stripe from "stripe";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    //add stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "gpb",
        payment_method_types: ["card"],
        receipt_email: req.user.email,
        shipping: {
          name: "Jenny Rosen",
          address: {},
        },
      });

      res
        .status(200)
        .json({ success: true, paymentIntent: paymentIntent.client_secret });

      //save payment intent id to db
      //   const savedSelfEmployments = await userTaxApplication.findOneAndUpdate(
      //     { formId: newFormId },
      //     { paymentIntentId: paymentIntent.id },
      //     { new: true, upsert: true }
      //   );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});

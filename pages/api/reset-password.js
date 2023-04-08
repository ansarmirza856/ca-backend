import connectDB from "../../db";
import User from "../../models/User";

var SibApiV3Sdk = require("sib-api-v3-sdk");

export default async function handler(req, res) {
  const { email } = req.body;

  if (req.method === "POST") {
    try {
      await connectDB();

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!user.isEmailVerified) {
        return res.status(400).json({ message: "Email not verified" });
      }

      const token = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      // Sendinblue email API integration
      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.sender = {
        name: "CA Accounts",
        email: "noreply@caaccounts.com",
      };

      sendSmtpEmail.to = [{ email: user.email }];
      sendSmtpEmail.replyTo = { email: "noreply@caaccounts.com" };
      sendSmtpEmail.subject = "Password reset OTP for your account";
      sendSmtpEmail.htmlContent = `Your password reset OTP is: <strong>${token}</strong>`;
      sendSmtpEmail.params = { token };

      await apiInstance.sendTransacEmail(sendSmtpEmail);

      return res
        .status(200)
        .json({ message: "Password reset otp sent successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request method" });
  }
}

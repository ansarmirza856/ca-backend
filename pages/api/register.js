import connectDB from "../../db";
import bcrypt from "bcrypt";

import User from "../../models/User";

import { sendEmail } from "@/utils/utils";

// var SibApiV3Sdk = require("sib-api-v3-sdk");

export default async (req, res) => {
  if (req.method === "POST") {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.phone
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    await connectDB();
    const { firstName, lastName, email, phone, password } = req.body;
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    // // Sendinblue email API integration
    // const defaultClient = SibApiV3Sdk.ApiClient.instance;
    // const apiKey = defaultClient.authentications["api-key"];
    // apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    // const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    // const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    // sendSmtpEmail.subject = "OTP Verification for My App";
    // sendSmtpEmail.htmlContent = `<p>Dear user,</p><p>Your OTP for CA Accounts is: <strong>${otp}</strong></p>`;
    // sendSmtpEmail.sender = {
    //   name: "CA Accounts",
    //   email: "noreply@caaccounts.com",
    // };
    // sendSmtpEmail.to = [{ email }];
    // sendSmtpEmail.replyTo = { email: "noreply@caaccounts.com" };
    // sendSmtpEmail.params = { OTP: otp };

    sendEmail(
      email,
      "OTP Verification for Crawley Accounts",
      `<p>Dear user,</p><p>Your OTP for CA Accounts is: <strong>${otp}</strong></p>`
    );

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        surName: lastName,
        email,
        phone,
        otp,
        password: hashedPassword,
      });
      await newUser.save();

      // Send the OTP email
      // const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

      sendEmail(
        "ansarmirza856@gmail.com",
        "New User Registration for Crawley Accounts",
        `<p>Dear Admin,</p><p>New user is registered on Crawley Accounts:</p><p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p>`
      );

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
};

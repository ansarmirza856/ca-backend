import connectDB from "../../db";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    await connectDB();

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user.isEmailVerified === false) {
        return res
          .status(401)
          .json({ success: false, message: "Please verify your email" });
      }

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { email: email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          //seconds in 10 days
          expiresIn: 864000,
        }
      );

      const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        {
          //seconds in 15 days
          expiresIn: 1296000,
        }
      );

      const {
        _id,
        email: userEmail,
        isEmailVerified,
        isAdmin,
        firstName,
        lastName,
        phone,
      } = user;

      return res.status(200).json({
        token,
        refreshToken,
        user: {
          id: _id,
          email: userEmail,
          isEmailVerified,
          isAdmin: isAdmin,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
};

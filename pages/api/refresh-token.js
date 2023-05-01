import connectDB from "../../db";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    await connectDB();
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    console.log("decoded:", decoded);

    const { email } = decoded;

    const user = await User.findOne({ email });

    const {
      _id,
      email: userEmail,
      isEmailVerified,
      isAdmin,
      firstName,
      lastName,
      surName,
      phone,
      currentAddress,
      nInumber,
      uTrNumber,
    } = user;

    const token = jwt.sign(
      { email: email, isAdmin: isAdmin },
      process.env.JWT_SECRET,
      {
        //seconds in 10 days
        expiresIn: 864000,
      }
    );

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: _id,
        email: userEmail,
        isEmailVerified,
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
        surName: surName,
        phone: phone,
        currentAddress: currentAddress,
        nInumber: nInumber,
        uTrNumber: uTrNumber,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Unauthorized", message: error.message });
  }
};

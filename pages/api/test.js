export default async (req, res) => {
  if (req.method === "POST") {
    return res.status(200).json({
      message: "Response from API. Hello World!",
      email: req.body.email,
      password: "password",
      test: "----------------",
      "MongoDB Url:": process.env.MONGODB_URI,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      "Sendinblue API Key:": process.env.SENDINBLUE_API_KEY,
      "Jwt Secret:": process.env.JWT_SECRET,
      "refresh token": process.env.REFRESH_TOKEN_SECRET,
      hello: "-------------------",
    });
  }
};

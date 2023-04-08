import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  let url = req.url;
  let token = req.cookies.get("token", { httpOnly: true });

  // verify JWT and get user info
  const response = fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/verify-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  if (decoded) {
    req.user = decoded;
  }

  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_API_BASE_URL);
  }

  if (token && url === process.env.NEXT_PUBLIC_API_BASE_URL) {
    return NextResponse.redirect("/dashboard");
  }
}

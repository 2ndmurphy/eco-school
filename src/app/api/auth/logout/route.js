// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json(
    { ok: true, message: "Logged out successfully" },
    { status: 200 }
  );
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });
  return response;
}

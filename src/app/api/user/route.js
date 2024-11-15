import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // Ambil token dari header authorization
    const cookie = cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token not provided" },
        { status: 401 }
      );
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the user ID is present in the decoded token
    if (!decoded.id) {
      return NextResponse.json(
        { error: "User ID not found in token" },
        { status: 401 }
      );
    }

    // Cari user berdasarkan ID yang didapatkan dari token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        points: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mengembalikan data user dalam format JSON
    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

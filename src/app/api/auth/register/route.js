import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";
import { generateToken, comparePassword } from "@/utils/auth";

export async function POST(request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser);
    const response = NextResponse.json(
      {
        ok: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      maxAge: 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

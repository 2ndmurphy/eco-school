// src/app/api/photos/[userId]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { userId } = params;
  try {
    // Fetch the user's photos
    const photos = await prisma.photo.findMany({
      where: { userId: parseInt(userId) },
      select: {
        id: true,
        url: true,
        width: true,
        height: true,
      },
    });

    // Count the user's photos
    const photoCount = await prisma.photo.count({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json({ photos, photoCount });
  } catch (error) {
    console.error("Error fetching user photos:", error);
    return NextResponse.error();
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/utils/authMiddleware";

export async function GET(req) {
  const user = await authMiddleware(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;

  try {
    const photos = await prisma.photo.findMany({
      select: {
        id: true,
        userId: true,
        url: true,
        width: true,
        height: true,
        likes: {
          where: { userId },
          select: { id: true },
        },
        user: {
          select: {
            username: true,
            profileImage: true
          }
        }
      },
    });

    const photosWithLikeStatus = photos.map((photo) => ({
      ...photo,
      isLikedByUser: photo.likes.length > 0,
      username: photo.user.username,
      profileUser: photo.user.profileImage
    }));

    return NextResponse.json(photosWithLikeStatus);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.error();
  }
}

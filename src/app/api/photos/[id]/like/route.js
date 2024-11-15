import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/utils/authMiddleware";

export async function POST(req, { params }) {
  const user = await authMiddleware(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;
  const photoId = parseInt(params.id);

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_photoId: { userId, photoId },
      },
    });

    if (existingLike) {
      // Jika sudah di-like, maka hapus like tersebut (unlike)
      await prisma.like.delete({
        where: {
          userId_photoId: { userId, photoId },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Jika belum di-like, tambahkan like baru
      await prisma.like.create({
        data: { userId, photoId },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.error();
  }
}

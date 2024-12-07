import prisma from "@/lib/prisma";

export async function getTotalLikesByUser(userId) {
  try {
    // Ambil semua foto user dan hitung jumlah like untuk setiap foto
    const photos = await prisma.photo.findMany({
      where: { userId },
      include: {
        likes: true, // Termasuk semua like di setiap foto
      },
    });

    // Hitung total like dari semua foto
    const totalLikes = photos.reduce(
      (acc, photo) => acc + photo.likes.length,
      0
    );

    return totalLikes;
  } catch (error) {
    console.error("Error fetching total likes:", error);
    throw error;
  }
}

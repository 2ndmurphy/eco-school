// utils/generateChallenge.js
import prisma from "@/lib/prisma";

export async function generateDailyChallenge() {
  const today = new Date().toISOString().split("T")[0];
  const existingChallenge = await prisma.challenge.findFirst({
    where: { startDate: today },
  });

  if (!existingChallenge) {
    await prisma.challenge.create({
      data: {
        title: "Clean the schoolyard", // Example data
        description: "Collect trash around the schoolyard",
        pointsReward: 5,
        startDate: new Date(),
        endDate: new Date(new Date().setHours(23, 59, 59)),
      },
    });
  }
}

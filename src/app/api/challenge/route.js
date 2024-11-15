// api/getTodayChallenge.js
import prisma from "@/lib/prisma";

export async function getTodayChallenge(userId) {
  const today = new Date().toISOString().split("T")[0];
  const challenge = await prisma.challenge.findFirst({
    where: { startDate: today },
  });

  const userChallenge = await prisma.userChallenges.findFirst({
    where: { userId, challengeId: challenge.id },
  });

  return { challenge, userChallenge };
}

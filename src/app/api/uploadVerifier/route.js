import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import { authMiddleware } from "../../../utils/authMiddleware";
import { verifyImageWithGoogleAI } from "../../../utils/GeminiVerifier";

import { getTodayChallenge } from "@/lib/challenges/getTodayChallenge";
import { assignUserChallenge } from "@/lib/challenges/assignUserChallenge";
import { completeUserChallenge } from "@/lib/challenges/completeUserChallenge";

import prisma from "@/lib/prisma";
import sizeOf from "image-size";
import crypto from "crypto";

export async function POST(req) {
  const user = await authMiddleware(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const imageFile = formData.get("photos");

  if (!imageFile) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  //! Verifikasi dengan Google Generative AI sebelum mengunggah gambar
  const isVerified = await verifyImageWithGoogleAI(imageFile);

  //! Debugging - tampilkan di console
  console.log("AI verification result:", isVerified, imageFile);

  //? Jika verifikasi gagal, hentikan proses dan beri pesan error
  if (!isVerified) {
    return NextResponse.json(
      { error: "Image verification failed, no points awarded" },
      { status: 400 }
    );
  }

  //? mengambil dimensi gambar (width, height)
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const { width, height } = sizeOf(buffer);

  //? Hashing gambar untuk validasi duplikat
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  const existingPhoto = await prisma.photo.findFirst({
    where: {
      userId: user.id,
      hash: hash,
    },
  });
  if (existingPhoto)
    return NextResponse.json(
      { error: "Duplicate image detected, no points awarded" },
      { status: 409 }
    );

  //? Jika verifikasi berhasil, lanjutkan mengunggah gambar ke Supabase Storage
  const fileName = `uploads/photos/${user.id}-${Date.now()}-${imageFile.name}`;
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(fileName, imageFile);

  if (error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

  // Beri poin acak antara 1 sampai 10
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  // Tambahkan foto ke database
  await prisma.photo.create({
    data: {
      userId: user.id,
      url: imageUrl,
      width: width,
      height: height,
      hash: hash,
    },
  });

  // Tambahkan poin ke user
  await prisma.user.update({
    where: { id: user.id },
    data: { points: { increment: randomPoints } },
  });

  // Catat poin di tabel Points
  await prisma.points.create({
    data: {
      userId: user.id,
      points: randomPoints,
      description: "Points for uploading a verified photo",
    },
  });

  //? poin tambahan jika sesuai dengan challenges
  const todayChallenge = await getTodayChallenge();
  if (todayChallenge) {
    await assignUserChallenge(user.id, todayChallenge.id);

    if (
      isVerified &&
      (await completeUserChallenge(user.id, todayChallenge.id))
    ) {
      await prisma.user.update({
        where: { id: user.id },
        data: { points: { increment: todayChallenge.pointsReward } },
      });

      await prisma.points.create({
        data: {
          userId: user.id,
          points: todayChallenge.pointsReward,
          description: `Bonus points for completing today's challenge ${todayChallenge.title}`,
        },
      });
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Image uploaded and verified successfully",
    points: randomPoints,
  });
}

import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import { authMiddleware } from "../../../utils/authMiddleware";

// Upload profile image to Supabase Storage
export async function POST(req) {
  // Authenticate the user and get the user object
  const user = await authMiddleware(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const profileImage = formData.get("profileImage");

  if (!profileImage) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Upload the image to Supabase Storage
  const fileName = `uploads/profiles/${user.id}-${Date.now()}-${
    profileImage.name
  }`;
  const { data, error } = await supabase.storage
    .from("profiles")
    .upload(fileName, profileImage);

  if (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }

  // Save the URL in the database
  const profileImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profiles/${fileName}`;
  await prisma.user.update({
    where: { id: user.id },
    data: { profileImage: profileImageUrl },
  });

  return NextResponse.json({
    ok: true,
    message: "Profile image uploaded successfully",
    profileImage: profileImageUrl,
  });
}

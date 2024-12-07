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

  try {
    const contentType = req.headers.get("content-type") || "";
    const isMultiPart = contentType.includes("multipart/form-data");

    let profileImageUrl = null;
    let email = null;
    let username = null;

    if (isMultiPart) {
      const formData = await req.formData();
      email = formData.get("email");
      username = formData.get("username");
      const profileImage = formData.get("profileImage");

      if (profileImage) {
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
        profileImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profiles/${fileName}`;
      }
    } else {
      const body = await req.json();
      email = body.email;
      username = body.username;
    }

    // Validate email and username
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    if (username && (username.length < 8 || /[^a-zA-Z0-9_]/.test(username))) {
      return NextResponse.json(
        {
          error:
            "Invalid username. Must be at least 8 characters and alphanumeric.",
        },
        { status: 400 }
      );
    }

    // Check for unique email or username
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: "Username already in use" },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(profileImageUrl && { profileImage: profileImageUrl }),
        ...(email && { email }),
        ...(username && { username }),
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }

  // const formData = await req.formData();
  // const profileImage = formData.get("profileImage");

  // if (!profileImage) {
  //   return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  // }

  // Upload the image to Supabase Storage
  // const fileName = `uploads/profiles/${user.id}-${Date.now()}-${
  //   profileImage.name
  // }`;
  // const { data, error } = await supabase.storage
  //   .from("profiles")
  //   .upload(fileName, profileImage);

  // if (error) {
  //   console.error("Error uploading image:", error);
  //   return NextResponse.json(
  //     { error: "Failed to upload image" },
  //     { status: 500 }
  //   );
  // }

  // Save the URL in the database
  // const profileImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profiles/${fileName}`;
  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { profileImage: profileImageUrl },
  // });

  // return NextResponse.json({
  //   ok: true,
  //   message: "Profile image uploaded successfully",
  //   profileImage: profileImageUrl,
  // });
}

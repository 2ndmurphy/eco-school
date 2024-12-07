"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "../../../loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Edit() {
  const { user, loading, error, setUser } = useUser();
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => setProfileImage(acceptedFiles[0]),
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
    return <Loading />;
  }

  const handleUpdateProfile = async () => {
    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    if (profileImage) formData.append("profileImage", profileImage);
    formData.append("email", email);
    formData.append("username", username);

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setUser(result.user); // Update user context
        setProfileImage(null); // Reset image
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update profile.",
        });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="container-profile w-full h-full flex items-center flex-col px-4">
      <div className="profile-box w-full h-fit">
        <header className="w-full py-3"></header>
        <div className="profile flex justify-center items-center w-full py-3">
          <Avatar className="w-36 h-36 rounded-full bg-slate-500 text-white">
            <div
              {...getRootProps({
                className:
                  "border-4 border-border w-full rounded-full h-full flex items-center justify-center bg-primary-foreground overflow-hidden cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Selected profile image"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              ) : user.profileImage ? (
                <AvatarImage src={user.profileImage} alt="User avatar" />
              ) : (
                <AvatarFallback className="text-2xl">
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </div>
          </Avatar>
        </div>

        <div className="field w-full flex flex-col space-y-4 mt-3">
          <div className="input flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm text-slate-500">
              EMAIL
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-md bg-white"
            />
          </div>
          <div className="input flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm text-slate-500">
              USERNAME
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 text-md bg-white"
            />
          </div>
          <Button
            onClick={handleUpdateProfile}
            disabled={isUploading}
            className="h-10 p-3"
          >
            {isUploading ? <span className="loader-button"></span> : "SIMPAN"}
          </Button>
          {message && (
            <p
              className={`text-sm mt-2 ${
                message.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

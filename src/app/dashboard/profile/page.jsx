// src/app/dashboard/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { buttonVariants } from "@/components/ui/button";

import Loading from "@/app/loading";
import Link from "next/link";
import ProfileMedia from "@/components/ProfileMedia";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const { user, loading, error } = useUser();
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPhotoCount = async () => {
      try {
        const response = await fetch(`/api/photos/profile/${user.id}`);
        const data = await response.json();
        setPhotoCount(data.photoCount);
      } catch (error) {
        console.error("Error fetching photo count:", error);
      }
    };

    if (user.id) fetchPhotoCount();
  }, [user?.id]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
    return <Loading />;
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await fetch("/api/uploadProfile", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setProfileImage(data.profileImage);
      alert("Profile image uploaded successfully!");
    }
  };

  return (
    <div className="h-full w-full overflow-y-scroll bg-slate-100 flex flex-col items-center">
      <header className="w-full flex flex-col">
        <div className="w-full flex justify-center items-center p-3 bg-white">
          <h1 className="grow">{user.username}</h1>
        </div>
        <div className="w-full flex flex-col px-4 py-4 gap-2">
          <div className="flex justify-between items-center grow">
            <Avatar className="flex justify-center items-center w-20 h-20 bg-slate-500 rounded-full text-white text-2xl border-none outline-none">
              <AvatarImage src="" alt="UserProfile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-center w-20 h-20">
              <h1 className="text-xl">{photoCount}</h1>
              <p className="text-secondary-foreground">Postingan</p>
            </div>
            <div className="flex flex-col justify-center items-center w-20 h-20">
              <h1 className="text-xl">{user.points}</h1>
              <p className="text-secondary-foreground">Points</p>
            </div>
            <div className="flex flex-col justify-center items-center w-20 h-20">
              <h1 className="text-xl">{user.points}</h1>
              <p className="text-secondary-foreground">Disukai</p>
            </div>
          </div>
          <div className="desc w-full py-1 text-xl text-primary">
            <h1 className="w-full font-md ">Rank</h1>
            <h1 className="w-full font-md ">Leaderboard</h1>
          </div>
        </div>

        <div className="w-full flex gap-2 px-3">
          <Link
            href="/dashboard/profile/edit"
            className={`${buttonVariants({
              variant: "default",
            })} w-1/2 text-lg font-bold`}
          >
            Edit profile
          </Link>
          <Link
            href="/dashboard/profile/edit"
            className={`${buttonVariants({
              variant: "default",
            })} w-1/2 text-lg font-bold bg-secondary-foreground`}
          >
            Bagikan profil
          </Link>
        </div>
      </header>

      <div className="w-full px-3 mt-4">
        <ProfileMedia userId={user.id} photoCount={photoCount} />
      </div>
    </div>
  );
}

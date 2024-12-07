// src/app/dashboard/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { buttonVariants } from "@/components/ui/button";
import { getTotalLikesByUser } from "@/utils/userLikes";

import Loading from "@/app/loading";
import Link from "next/link";
import ProfileMedia from "@/components/ProfileMedia";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Profile() {
  const { user, loading, error } = useUser();
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const fetchPhotoCount = async () => {
      try {
        const response = await fetch(`/api/photos/profile/${user.id}`);
        const data = await response.json();
        setPhotoCount(data.photoCount);
        setLikeCount(data.totalLikes);
      } catch (error) {
        console.error("Error fetching photo count:", error);
      }
    };

    if (user?.id) fetchPhotoCount();
  }, [user?.id]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
    return <Loading />;
  }

  return (
    <div className="h-full w-full overflow-y-scroll bg-slate-100 flex flex-col items-center">
      <header className="w-full flex flex-col">
        <div className="w-full flex justify-center items-center px-4 py-2 bg-white">
          <h1 className="grow">{user.username}</h1>
        </div>
        <div className="w-full flex flex-col px-4 py-4 gap-2">
          <div className="flex justify-between space-x-3 items-center">
            <Avatar className="flex justify-center items-center w-20 h-20 bg-slate-500 rounded-full text-white text-2xl border-none outline-none">
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
            </Avatar>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center w-20 h-20">
                <h1 className="text-xl">{photoCount}</h1>
                <p className="text-secondary-foreground">postingan</p>
              </div>
              <div className="flex flex-col justify-center items-center w-20 h-20">
                <h1 className="text-xl">{user.points}</h1>
                <p className="text-secondary-foreground">points</p>
              </div>
              <div className="flex flex-col justify-center items-center w-20 h-20">
                <h1 className="text-xl">{likeCount}</h1>
                <p className="text-secondary-foreground">disukai</p>
              </div>
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

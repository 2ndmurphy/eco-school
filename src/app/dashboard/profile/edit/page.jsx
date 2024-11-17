"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import Loading from "../../../loading";
import Media from "@/components/CommunityMedia";

export default function Edit() {
  const { user, loading, error } = useUser();
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  // Fetch user data after component mounts
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
    return <Loading />;
  }

  if (!user) return <Loading />;

  return (
    <>
      <div className="h-full w-full overflow-y-scroll bg-red-800 flex flex-col items-center">
        <h1>Hi</h1>
      </div>
    </>
  );
}

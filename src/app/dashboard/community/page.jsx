"use client";

import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CommunityMedia from "@/components/CommunityMedia";
import Loading from "@/app/loading";

function Community() {
  //? Akses user, loading, dan error dari UserContext
  const { user, loading, error } = useUser();
  const router = useRouter();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
  }
  return (
    <section className="h-full w-full flex flex-col overflow-y-scroll px-4">
      <div className="search-box w-full py-3 flex items-center space-x-3">
        <input
          type="text"
          className="grow px-2 py-1 rounded-md"
          placeholder="Cari sesuatu..."
        />
        <Button className="rounded-full" size="icon">
          H
        </Button>
      </div>

      <div className="all-media w-full">
        <CommunityMedia />
      </div>
    </section>
  );
}

export default Community;

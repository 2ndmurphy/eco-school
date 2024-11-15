"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "@/app/loading";

//? shadcn UI
import { Button } from "@/components/ui/button";

//? lucide UI icon
import { Swords, Leaf, Shovel } from "lucide-react";

//? custom UI
import UserItem from "@/components/dashboard/UserItem";
import CardWord from "@/components/dashboard/CardWord";
import Media from "@/components/ContentMedia";
import UserMenu from "@/components/dashboard/UserMenu";
import ChallengeCard from "@/components/dashboard/ChallengeCard";
import CardBlogs from "@/components/dashboard/CardBlogs";

export default function Dashboard() {
  //? Akses user, loading, dan error dari UserContext
  const { user, loading, error } = useUser();
  const router = useRouter();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
  }

  if (!user) return <Loading />;

  return (
    <>
      <div className="h-full w-full flex flex-col overflow-y-scroll bg-slate-100 bg-cover bg-center bg-no-repeat">
        <section className="min-w-full h-full flex flex-col justify-start items-center py-3 px-8 space-y-5 backdrop-blur-sm overflow-x-hidden">
          <header className="w-full h-20 flex pt-10 justify-between items-end">
            <h1 className="font-semibold text-3xl font-sans">
              Let`s make <br /> for bright future
            </h1>
            <UserMenu />
          </header>

          <CardWord userPoints={user.points} />

          <ChallengeCard />

          {/* <CardBlogs /> */}
        </section>
      </div>
    </>
  );
}

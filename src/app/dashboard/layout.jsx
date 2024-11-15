"use client";

import Navbar from "@/components/navbar";
import "../globals.css";
import UserProvider from "@/context/UserContext";

export default function Layout({ children }) {
  return (
    <>
      <main className="flex flex-col bg-[#d9dee0] justify-center items-center overflow-x-hidden h-dvh max-w-md mx-auto">
        <UserProvider>{children}</UserProvider>
        <Navbar />
      </main>
    </>
  );
}

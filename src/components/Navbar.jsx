"use client";

import Link from "next/link";
import {
  House,
  Search,
  UserRound,
  Camera,
  ChartNoAxesColumnDecreasing,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed flex items-center bottom-0 z-50 w-full max-w-md min-h-12 bg-white rounded-tr-xl rounded-tl-xl">
      <ul className="w-full flex justify-around items-center px-6 py-2">
        <li>
          <Link href="/dashboard" className="hover:scale-90" prefetch>
            <House className="text-black hover:scale-110" />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/community" className="hover:scale-90" prefetch>
            <Search className="text-black hover:scale-110" />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/points" className="hover:scale-90" prefetch>
            <Camera className="text-black hover:scale-110" />
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/leaderboard"
            className="hover:scale-90"
            prefetch
          >
            <ChartNoAxesColumnDecreasing className="text-black hover:scale-110" />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="hover:scale-90" prefetch>
            <UserRound className="text-black hover:scale-110" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

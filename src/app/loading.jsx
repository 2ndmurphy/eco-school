"use client";

import "./globals.css";
import { Triangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span className="text-xl font-md text-slate-400">Wait for a moment</span>
    </div>
  );
}

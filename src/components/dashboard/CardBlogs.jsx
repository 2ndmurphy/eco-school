// components/ChallengeCard.js
import { Leaf, Shovel, Swords } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardBlogs() {
  const [error, setError] = useState("");

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-sm text-gray-400">DAILY CHALLENGE</h2>
        <h2>see all</h2>
      </div>

      <div className="card-blog w-full flex px-3 flex-col rounded-2xl bg-white shadow-lg">
        <div className="card-item w-full space-y-2 400 bg-opacity-10 py-2">
          <div className="card-content flex items-center">
            <div className="w-6 h-6 flex justify-center items-center bg-blue-500 rounded-lg mr-3">
              <Swords color="white" />
            </div>
            <div>
              <h3 className="text-md">Jadilah Pejuang!</h3>
              <p className="text-xs">upload 3 photo kegiatan membersihkan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBlogs;

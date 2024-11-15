// components/ChallengeCard.js
import { Leaf, Shovel, Swords } from "lucide-react";
import React, { useEffect, useState } from "react";

function ChallengeCard() {
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchChallenge = async () => {
  //     try {
  //       const response = await fetch("/api/challenge");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setChallenge(data.challenge);
  //       } else {
  //         setError("Tidak ada tantangan untuk hari ini");
  //       }
  //     } catch (error) {
  //       setError("Gagal mengambil tantangan harian.");
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchChallenge();
  // }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-sm text-gray-400">DAILY CHALLENGE</h2>
        <h2>see all</h2>
      </div>

      <div className="card w-full flex py-2 px-3 flex-col rounded-2xl bg-white shadow-lg">
        <div className="card-item w-full space-y-2 400 bg-opacity-10 py-2">
        
          <div className="card-content flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-lg mr-3">
              <Swords color="white" />
            </div>
            <div>
              <h3 className="text-md">Jadilah Pejuang!</h3>
              <p className="text-xs">upload 3 photo kegiatan membersihkan</p>
            </div>
          </div>
          <div className="card-content flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-lg mr-3">
              <Leaf color="white" />
            </div>
            <div>
              <h3 className="text-sm">Menyapu helai kehidupan</h3>
              <p className="text-xs">membersihkan daun yang berserakan</p>
            </div>
          </div>
          <div className="card-content flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-lg mr-3">
              <Shovel color="white" />
            </div>
            <div>
              <h3 className="text-sm">Tanam kehidupan baru</h3>
              <p className="text-xs">menanam berbagai jenis tanaman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;

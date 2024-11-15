// src/components/LikeButton.js

"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

function LikeButton({ photoId, initialLiked }) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleToggleLike = async () => {
    try {
      const res = await fetch(`/api/photos/${photoId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.liked);
      }
    } catch (error) {
      console.log("🚀 ~ handleToggleLike ~ error:", error);
    }
  };

  return (
    <Button onClick={handleToggleLike} size="likes" variant="transparancy">
      {isLiked ? <Heart color="red" fill="red" /> : <Heart />}
    </Button>
  );
}

export default LikeButton;

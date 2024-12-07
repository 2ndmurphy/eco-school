// src/components/ProfileMedia.js
import React from "react";
import { useEffect, useState, useMemo } from "react";
import ImagePlaceholder from "./placeholder/ImagePlaceholder";
import Image from "next/image";
import LikeButton from "./LikeButton";

function ProfileMedia({ userId, photoCount }) {
  const [photos, setPhotos] = useState([]);
  const [isLiked, setIsLikedByUser] = useState([]);

  useEffect(() => {
    const getUserPhotos = async () => {
      try {
        const response = await fetch(`/api/photos/profile/${userId}`);
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching user photos:", error);
      }
    };
    if (userId) getUserPhotos();
  }, [userId]);

  const renderedPhotos = useMemo(() => {
    return photos?.map((photo, index) => {
      const aspectRatio = photo.width / photo.height;
      const sizeClass =
        aspectRatio > 1.6
          ? "col-span-2 row-span-1 aspect-ratio-16x9"
          : aspectRatio > 1
          ? "col-span-1 row-span-2 aspect-ratio-4x3"
          : "col-span-1 row-span-1";

      return (
        <div key={index} className={`rounded-full ${sizeClass}`}>
          <figure className="relative w-fit h-fit">
            <Image
              src={photo.url}
              alt={`User Upload ${index}`}
              className="rounded-lg object-cover"
              width={300}
              height={300}
              priority
            />
            <figcaption className="absolute flex flex-col text-lg text-white bottom-0 w-full z-30 px-2 bg-transparent rounded-lg">
              <div className="flex justify-between items-center">
                
              </div>
            </figcaption>
          </figure>
        </div>
      );
    });
  }, [photos]);

  return (
    <div>
      <div className="w-full grid grid-cols-2 gap-x-5 gap-y-5 place-items-center">
        {photos.length > 0 ? renderedPhotos : <div></div>}
      </div>
    </div>
  );
}

export default React.memo(ProfileMedia);

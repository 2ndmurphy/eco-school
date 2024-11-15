// src/components/Media.js
import Image from "next/image";
import { useEffect, useState } from "react";
import ImagePlaceholder from "./placeholder/ImagePlaceholder";
import LikeButton from "./LikeButton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Media = ({ username }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    getPhotos();
  }, []);

  return (
    <div className="w-fit grid grid-cols-2 gap-x-5 gap-y-5 place-items-center">
      {photos.length > 0 ? (
        photos.map((photo, index) => {
          const aspectRatio = photo.width / photo.height;

          const sizeClass =
            aspectRatio > 1.6
              ? "col-span-2 row-span-1 aspect-ratio-16x9"
              : aspectRatio > 1
              ? "col-span-1 row-span-2 aspect-ratio-4x3"
              : "col-span-1 row-span-1";

          return (
            <div key={photo.id} className={`rounded-full ${sizeClass}`}>
              <figure className="relative w-fit h-fit">
                <Image
                  src={photo.url}
                  alt={`User Upload ${index}`}
                  className="rounded-lg object-cover"
                  sizes="100vw"
                  width={300}
                  height={300}
                  priority
                />
                <figcaption className="absolute flex flex-col items-end text-lg text-white top-0 w-full h-full z-30 p-2 bg-transparent rounded-lg">
                  <div className="flex grow">
                    <LikeButton
                      photoId={photo.id}
                      initialLiked={photo.isLikedByUser}
                    />
                  </div>
                  <div className="w-full flex space-x-3 items-center text-primary-foreground">
                    <Avatar>
                      <AvatarImage src="" alt="UserProfile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm font-semibold">{username}</h4>
                  </div>
                </figcaption>
              </figure>
            </div>
          );
        })
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  );
};

export default Media;

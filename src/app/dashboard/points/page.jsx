"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import Loading from "@/app/loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Notification from "@/components/Notification";

export default function PointsPage() {
  const { user, loading, error } = useUser();
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({
    success: false,
    failed: false,
    error: false,
    titles: "",
    description: "",
  });
  const [NotificationVisible, setNotificationVisible] = useState(false);
  const router = useRouter();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    router.push("/auth/login");
    return <Loading />;
  }

  const handleUpload = async () => {
    if (!image) {
      setMessage({
        success: false,
        failed: true,
        error: false,
        titles: "",
        description: "Please upload an image.",
      });
      return;
    }

    setIsUploading(true);
    setMessage({
      success: false,
      failed: false,
      error: false,
      titles: "",
      description: "",
    });

    const formData = new FormData();
    formData.append("photos", image);
    formData.append("userId", user.id);

    try {
      const response = await fetch("/api/uploadVerifier", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.ok) {
        setPoints(points + result.points);
        setMessage({
          success: true,
          failed: false,
          error: false,
          titles: "Image verified!",
          description: `You earned ${result.points} points.`,
        });
      } else {
        setMessage({
          success: false,
          failed: true,
          error: false,
          titles: "Please try again.",
          description: result.error || "Image verification failed.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        success: false,
        failed: false,
        error: true,
        titles: "",
        description: "Something went wrong!",
      });
    } finally {
      setIsUploading(false);
      setImage(null);
    }
    setNotificationVisible(true);
  };

  return (
    <div className="relative flex items-center w-full h-full bg-slate-100">
      <section className="relative w-full h-full flex flex-col items-center px-4 py-10 space-y-10 overflow-y-scroll">
        <div className="bagde-warning w-full h-32 bg-yellow-200 rounded-lg border-4 border-white p-3">
          <h1>Peringatan!</h1>

          <p className="text-justify">
            Saat ini sistem kami masih dalam tahap percobaan jika terjadi bug
            atau apapun silahkan lapor ke service kami
          </p>
        </div>

        <div className="upload-box w-full flex flex-col items-center space-y-5">
          <div
            {...getRootProps({
              className:
                "border-dashed border-4 border-border p-6 w-full rounded-md h-64 flex items-center text-center justify-center bg-primary-foreground overflow-hidden cursor-pointer",
            })}
          >
            <input {...getInputProps()} />
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                width={200}
                height={200}
                alt="Dropped image"
              />
            ) : (
              <p>
                Drag dan drop file image dengan format jpeg/jpg/png atau klik
                untuk memilih file
              </p>
            )}
          </div>

          <Button
            className="mt-4 text-white rounded w-full flex justify-center items-center text-lg"
            onClick={handleUpload}
            disabled={isUploading}
            size="lg"
          >
            {isUploading ? (
              <span className="loader-button"></span>
            ) : (
              "VERIFIKASI"
            )}
            {/* <span className="loader-button"></span> */}
          </Button>
        </div>

        {message.description && (
          <div className="absolute right-3 bottom-16 z-50">
            {NotificationVisible && (
              <Notification
                type={
                  message.success
                    ? "success"
                    : message.failed
                    ? "warning"
                    : "error"
                }
                header={message.titles}
                description={message.description}
                onClose={() => {
                  setNotificationVisible(false);
                  setImage(null);
                }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

const RenderPayloadImage = ({ file }: { file: File | null }) => {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const renderImage = () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file as Blob);
    };
    if (file) {
      renderImage();
    } else {
      setDataUrl("");
    }
  }, [file]);

  return (
    <>
      {!dataUrl ? null : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dataUrl}
          alt="image_payload"
          className="w-40 aspect-square object-contain"
        />
      )}
    </>
  );
};
export default RenderPayloadImage;

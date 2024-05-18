"use client";

import { IImage } from "@/models/image";
import Img from "./Img";
import ImageUpload from "@/components/shared/image-upload/image-upload";
import { useState } from "react";

type ImagesProps = {
  images: IImage[] | null;
  choosenImageName: string;
  chooseName: (name: string) => void;
  refetch: () => void | Promise<void>;
};

const Images = ({
  images,
  choosenImageName,
  chooseName,
  refetch,
}: ImagesProps) => {
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3">
      <ImageUpload
        imgLoading={imgLoading}
        setImgLoading={setImgLoading}
        refetch={refetch}
      />
      <div className="grid gap-2 grid-cols-3 w-full items-start content-start">
        {images?.map((image) => (
          <Img
            key={image.name}
            {...image}
            choosenImageName={choosenImageName}
            chooseName={chooseName}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};
export default Images;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { IImage } from "@/models/image";
import Images from "./Images";
import CONFIG from "@/config";
import RenderImage from "@/components/shared/image/RenderImage";

type ImageStoreProps = {
  choosenImageName: string;
  setChoosenImageName: (name: string) => void;
};

const ImageStore = ({
  choosenImageName,
  setChoosenImageName,
}: ImageStoreProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<IImage[] | null>(null);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const fetchImages = async () => {
    const result = await request({
      url: `${CONFIG.img_store_origin}/image/all`,
      method: "GET",
      apiAuth: true,
    });
    if (result) {
      if (!result.success) {
        errorHandler(result.error);
      } else {
        setImages(result.data as IImage[]);
      }
    }
  };

  const chooseName = (name: string) => {
    setChoosenImageName(name);
    setOpen(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <DialogRenderer
        open={open}
        setOpen={setOpen}
        scroll
        trigger={
          <Button
            type="button"
            className="flex items-center gap-2 overflow-hidden"
          >
            Image Picker
            <ImagePlus />
          </Button>
        }
        content={
          <DialogContentRenderer
            centeredHeader
            title="Image Picker"
            description="Choose or upload new image"
            content={
              <Images
                images={images}
                choosenImageName={choosenImageName}
                chooseName={chooseName}
                refetch={fetchImages}
              />
            }
          />
        }
      />

      {choosenImageName ? (
        <>
          <RenderImage
            name={choosenImageName}
            className="w-1/2 border-4 border-primary rounded-md object-cover "
          />
        </>
      ) : null}
    </>
  );
};
export default ImageStore;

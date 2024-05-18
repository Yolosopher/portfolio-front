"use client";
import { useEffect, useState } from "react";
import UploadInput from "../input/UploadInput";
import useParseError from "@/hooks/parse-error/useParseError";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import CONFIG from "@/config";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import RenderPayloadImage from "./RenderPayloadImage";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type ImageUploadProps = {
  imgLoading: boolean;
  setImgLoading: (loading: boolean) => void;
  refetch: () => void | Promise<void>;
};

const ImageUpload = ({
  refetch,
  imgLoading,
  setImgLoading,
}: ImageUploadProps) => {
  const [filePayload, setFilePayload] = useState<null | File>(null);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const uploadImage = async () => {
    if (!filePayload) return;

    try {
      setImgLoading(true);
      const formData = new FormData();
      formData.append("access", "public");
      formData.append("image", filePayload);
      const result = await request({
        url: `${CONFIG.img_store_origin}/image/upload`,
        method: "POST",
        body: formData,
        apiAuth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "success",
            description:
              (result.data.message ?? "Image uploaded") +
              `name: ${result.data.image_name}`,
          });
          refetch();
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setImgLoading(false);
    }
  };
  useEffect(() => {
    if (filePayload) {
      uploadImage();
    }
  }, [filePayload]);

  return (
    <>
      <UploadInput
        disabled={imgLoading}
        label="Image"
        setFile={setFilePayload}
      />
      <Separator className="my-3" />

      {/* <div className="w-full overflow-hidden flex justify-center">
        {filePayload ? <RenderPayloadImage file={filePayload} /> : null}
      </div> */}
      {/* 
      <Button
        type="button"
        onClick={uploadImage}
        variant={"secondary"}
        // size={"sm"}
        className="w-max self-center mt-3 gap-2"
        disabled={imgLoading}
      >
        
        <span>{imgLoading ? "Uploading..." : "Upload Image"}</span>
      </Button> */}
    </>
  );
};
export default ImageUpload;

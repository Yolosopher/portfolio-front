"use client";

import RenderImage from "@/components/shared/image/RenderImage";
import { Button } from "@/components/ui/button";
import CONFIG from "@/config";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { IImage } from "@/models/image";
import { MousePointerClick, Trash } from "lucide-react";
import { Confirm } from "../confirm/Confirm";
import { Badge } from "@/components/ui/badge";

interface ImgProps extends IImage {
  choosenImageName: string;
  chooseName: (name: string) => void;
  refetch: () => void;
}

const Img = ({ choosenImageName, chooseName, name, refetch }: ImgProps) => {
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const deleteImage = async () => {
    const result = await request({
      url: `${CONFIG.img_store_origin}/image/${name}`,
      method: "DELETE",
      apiAuth: true,
    });
    if (result) {
      if (!result.success) {
        errorHandler(result.error);
      } else {
        refetch();
      }
    }
  };

  return (
    <div className="w-full flex justify-center relative group bg-secondary overflow-visible">
      <RenderImage
        className="aspect-square rounded-md"
        name={name}
        width={140}
        height={140}
      />
      <Confirm
        action={deleteImage}
        description="Are you sure you want to delete this image?"
        trigger={
          <div className="overflow-hidden cursor-pointer transition-all opacity-0 group-hover:opacity-100 absolute bg-destructive/70 rounded-full p-2 aspect-square top-2 right-2 z-10 hover:bg-destructive">
            <Trash size={14} />
          </div>
        }
      />
      <Confirm
        action={() => chooseName(name)}
        description=" "
        trigger={
          <div className="overflow-hidden cursor-pointer transition-all opacity-0 group-hover:opacity-100 absolute bg-bluish rounded-full p-2 aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hover:bg-primary">
            <MousePointerClick size={22} />
          </div>
        }
      />
      {choosenImageName === name && (
        <Badge
          onClick={() => chooseName(name)}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 bg-green-500"
        >
          selected
        </Badge>
      )}
    </div>
  );
};
export default Img;

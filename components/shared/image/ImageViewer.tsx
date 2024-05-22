"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Clipboard from "../clipboard/Clipboard";

type ImageViewerProps = {
  name: string;
  src: string;
  children: React.ReactNode;
  invertOnDark?: boolean;
};

const ImageViewer = ({
  name,
  src,
  children,
  invertOnDark,
}: ImageViewerProps) => {
  return (
    <Dialog>
      <DialogTrigger className="flex relative w-full h-full">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[unset] w-[90dvw] h-[90dvh] flex flex-col select-none">
        <DialogHeader className="flex-shrink-0 flex-grow-0 flex-b">
          <DialogTitle className="text-center">
            <Clipboard maxLength={10} content={name} />
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center flex-1 relative">
          <Image
            src={src}
            alt={name}
            className={cn(
              "w-full object-contain bg-dw",
              invertOnDark ? "dark:filter dark:invert" : ""
            )}
            fill
            sizes="90vw"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ImageViewer;

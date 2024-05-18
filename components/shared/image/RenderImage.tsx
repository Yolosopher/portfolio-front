import CONFIG from "@/config";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

interface RenderImageProps extends Omit<ImageProps, "src" | "alt"> {
  name: string;
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const RenderImage = ({
  name,
  src,
  alt,
  className,
  width,
  height,
  ...args
}: RenderImageProps) => {
  return (
    <Image
      src={`${CONFIG.img_store_origin}/image/${name}`}
      alt={alt ?? name}
      className={cn("w-40 aspect-square object-contain", className)}
      width={width ?? 160}
      height={height ?? 160}
      {...args}
    />
  );
};
export default RenderImage;

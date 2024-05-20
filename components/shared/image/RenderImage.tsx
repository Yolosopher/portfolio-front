import CONFIG from "@/config";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import ImageViewer from "./ImageViewer";

interface RenderImageProps extends Omit<ImageProps, "src" | "alt"> {
  name: string;
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  viewer?: boolean;
  invertOnDark?: boolean;
}

const RenderImage = ({
  name,
  src,
  alt,
  className,
  width,
  height,
  viewer,
  invertOnDark,
  ...args
}: RenderImageProps) => {
  const source = src ?? `${CONFIG.img_store_origin}/image/${name}`;

  const IMG = () => (
    <Image
      src={source}
      alt={alt ?? name}
      className={cn(
        "w-40 aspect-square object-scale-down",
        invertOnDark ? "dark:filter dark:invert" : "",
        className
      )}
      width={width ?? 160}
      height={height ?? 160}
      {...args}
    />
  );

  return viewer ? (
    <ImageViewer name={name} src={source} invertOnDark={invertOnDark}>
      <IMG />
    </ImageViewer>
  ) : (
    <IMG />
  );
};
export default RenderImage;

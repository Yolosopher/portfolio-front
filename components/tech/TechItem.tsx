import { ITechStack } from "@/models/tech";
import Image from "next/image";
import RenderImage from "../shared/image/RenderImage";
import { cn } from "@/lib/utils";

interface TechItemProps extends ITechStack {
  hidden?: boolean;
}
const TechItem = ({
  _id,
  description,
  icon,
  name,
  level,
  hidden,
}: TechItemProps) => {
  const invertOnDark = description && description.includes("invert");
  return hidden ? null : (
    <li className="max-w-[7.5rem] w-full aspect-square flex justify-center items-center">
      <RenderImage
        name={icon}
        alt={name}
        width={120}
        height={120}
        className={cn(
          "max-w-[7.5rem] w-full",
          invertOnDark ? "dark:filter dark:invert" : ""
        )}
      />
    </li>
  );
};
export default TechItem;

import { ITechStack } from "@/models/tech";
import RenderImage from "../shared/image/RenderImage";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import ShowLevelAndName from "./ShowLevelAndName";

interface TechItemProps extends ITechStack {
  hidden?: boolean;
  showRange?: boolean;
}
const TechItem = ({
  _id,
  description,
  icon,
  name,
  level,
  hidden,
  showRange,
}: TechItemProps) => {
  const invertOnDark = description && description.includes("invert");

  return hidden ? null : (
    <li className="max-w-[7.5rem] w-full aspect-square flex justify-center items-center">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="flex flex-col gap-2">
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
            {showRange && (
              <ShowLevelAndName name={name} level={level} max={10} />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-base select-auto capitalize">{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};
export default TechItem;

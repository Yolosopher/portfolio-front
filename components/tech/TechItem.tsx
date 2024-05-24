import { ITechStack } from "@/models/tech";
import RenderImage from "../shared/image/RenderImage";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
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

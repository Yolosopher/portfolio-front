import { IProject } from "@/models/project";
import RenderImage from "../shared/image/RenderImage";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import ViewGithub from "./ViewGithub";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface ProjectsItemProps extends IProject {
  hidden?: boolean;
}
const ProjectsItem = ({
  _id,
  description,
  image,
  name,
  github,
  group,
  preview,
  stack,
  hidden,
}: ProjectsItemProps) => {
  return hidden ? null : (
    <li className="w-full h-max">
      <article
        className={cn(
          "w-full min-h-[41.375rem] flex flex-col rounded-[1.25rem] bg-nighty overflow-hidden",
          "shadow-[0_2px_100px_hsl(var(--primary)/0.5)] dark:shadow-[0_2px_100px_hsl(var(--primary)/0.2)]"
        )}
      >
        <div className="w-full h-[16.25rem] relative">
          <RenderImage
            name={image}
            alt={name}
            viewer
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="px-6 py-5 flex-1 flex flex-col">
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3 className="text-center w-full font-medium text-bluish flex-1 dark:text-shd text-[1.75rem] mb-[.625rem] capitalize leading-[42px] flex items-center justify-center select-none">
                <span className="line-clamp-2 overflow-hidden">{name}</span>
              </h3>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80">
              <p className="text-base select-auto capitalize">{name}</p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-base line-clamp-5 mb-3 select-none text-gr dark:text-shd">
                {description}
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-base select-auto">{description}</p>
            </HoverCardContent>
          </HoverCard>
          <div className="mb-4">
            <h4 className="text-md mb-1 text-bluish dark:text-shd">
              Tech stack:
            </h4>
            <ul className="flex flex-wrap gap-1 select-none">
              {stack?.map((tech, i) => (
                <li
                  key={tech._id}
                  className="text-xs px-2 py-1 bg-purple-500 text-white dark:bg-background dark:text-purple-500 rounded-[.25rem]"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-1">
            <Button
              asChild
              rel="noreferrer"
              variant={"link"}
              className="text-black dark:text-white gap-2 p-0"
            >
              <a href={preview} target="_blank">
                <Link size={16} />
                <div className="text-base capitalize">live preview</div>
              </a>
            </Button>
            <ViewGithub link={github} />
          </div>
        </div>
      </article>
    </li>
  );
};
export default ProjectsItem;

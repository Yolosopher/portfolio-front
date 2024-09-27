"use client";
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
import { useInView } from "react-intersection-observer";
import useClientT from "@/hooks/client-t/useClientT";

interface ProjectsItemProps extends IProject {
    hidden: boolean;
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
    const { t } = useClientT();
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0.2,
        triggerOnce: true,
    });

    return hidden ? null : (
        <li className="w-full h-max" ref={ref}>
            <article
                className={cn(
                    "w-full min-h-[41.375rem] flex flex-col rounded-[1.25rem] bg-nighty overflow-hidden",
                    "shadow-[0_2px_100px_hsl(var(--primary)/0.5)] dark:shadow-[0_2px_100px_hsl(var(--primary)/0.2)]",
                    "duration-700 transition-opacity sm:!opacity-100",
                    inView ? "opacity-100" : "opacity-0"
                )}
            >
                <div className={cn("w-full h-[16.25rem] relative")}>
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
                            <h3 className="text-center w-full font-medium text-bluish dark:text-shd text-[1.75rem] mb-[.625rem] capitalize leading-[42px] h-[84px] flex justify-center select-none">
                                <span className="line-clamp-2 overflow-hidden">
                                    {name}
                                </span>
                            </h3>
                        </HoverCardTrigger>
                        <HoverCardContent side="top" className="w-80">
                            <p className="text-base select-auto capitalize">
                                {name}
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <p className="text-base line-clamp-5 mb-3 select-none text-gr dark:text-shd flex-1">
                                {description}
                            </p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <p className="text-base select-auto">
                                {description}
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                    <div className="mb-4">
                        <h4 className="text-md mb-1 text-bluish dark:text-shd">
                            {t("TECH_STACK")}:
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
                            variant={"link"}
                            className="text-black dark:text-white gap-2 p-0"
                        >
                            <a
                                href={preview}
                                target="_blank"
                                rel="nofollow noreferrer noopener"
                                data-umami-event={`Live preview - ${name}`}
                            >
                                <Link size={16} />
                                <div className="text-base capitalize">
                                    {t("LIVE_PREVIEW")}
                                </div>
                            </a>
                        </Button>
                        <ViewGithub link={github} name={name} />
                    </div>
                </div>
            </article>
        </li>
    );
};
export default ProjectsItem;

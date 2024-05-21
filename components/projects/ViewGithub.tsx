"use client";

import { Github } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

const ViewGithub = ({ link }: { link: string }) => {
  if (link.includes(", ")) {
    const links = link.split(", ");
    const backendLink = links[0]; //first is always backend
    const frontendLink = links[1]; //first is always backend

    return (
      <Popover>
        <PopoverTrigger>
          <Button
            rel="noreferrer"
            variant={"link"}
            type="button"
            className="text-black dark:text-white gap-2 p-0"
          >
            <Github size={16} />
            <div className="text-base capitalize">view code</div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="flex flex-col gap-0.5 w-36 p-0.5"
        >
          <a
            href={backendLink}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
          >
            Backend
          </a>
          <a
            href={frontendLink}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
          >
            Frontend
          </a>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Button
      asChild
      rel="noreferrer"
      variant={"link"}
      className="text-black dark:text-white gap-2 p-0"
    >
      <a href={link} target="_blank">
        <Github size={16} />
        <div className="text-base capitalize">view code</div>
      </a>
    </Button>
  );
};
export default ViewGithub;

import { IProject } from "@/models/project";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import ProjectsItem from "./ProjectsItem";
import { SizeInfo } from "@/types";

export type ProjectsContentProps = {
  projects: IProject[];
  active: boolean;
  sizeInfo: SizeInfo;
};

const ProjectsContent = ({
  sizeInfo,
  projects,
  active,
}: ProjectsContentProps) => {
  return (
    <ul
      className={cn(
        poppins.className,
        "grid gap-x-4 gap-y-6 xl:gap-x-12 xl:gap-y-16 justify-center justify-items-center origin-left transition w-full duration-700 ease-in",
        `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`,
        active
          ? "translate-x-0 opacity-100 scale-x-100"
          : "-translate-x-[15%] opacity-30 scale-x-[.9]"
      )}
    >
      {projects.map((project, i) => (
        <ProjectsItem key={project._id} {...project} hidden={i + 1 >= 7} />
      ))}
    </ul>
  );
};
export default ProjectsContent;

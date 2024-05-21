import { fetchProjects } from "@/actions/projects";
import SectionTitle from "@/components/home/section-title/SectionTitle";
import ProjectsItem from "@/components/projects/ProjectsItem";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IProject } from "@/models/project";

const Projects = async () => {
  const result = await fetchProjects();
  const projects = result.data as IProject[];
  return (
    <div className="overflow-hidden section-element">
      <section className="container pt-8 sm:pt-10 lg:pt-16 xl:pt-20 pb-44">
        <SectionTitle
          title="Projects"
          description="Some of the things I've built so far"
        />
        <div className="flex justify-start w-full min-h-[567px] overflow-visible">
          <ul
            className={cn(
              poppins.className,
              "grid gap-x-4 gap-y-6 xl:gap-x-12 xl:gap-y-16 justify-center justify-items-center origin-left transition w-full duration-700 ease-in",
              `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`,
              "translate-x-0 opacity-100 scale-x-100"
            )}
          >
            {projects.map((project, i) => (
              <ProjectsItem key={project._id} {...project} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
export default Projects;

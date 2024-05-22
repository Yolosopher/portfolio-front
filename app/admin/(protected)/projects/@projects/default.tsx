import { fetchProjects } from "@/actions/projects";
import { fetchTechs } from "@/actions/techs";
import ProjectFormRenderer from "@/components/admin/project/ProjectFormRenderer";
import ProjectTable from "@/components/admin/project/ProjectTable";
import { ITechStack } from "@/models/tech";
import { Loader } from "lucide-react";
import { revalidateTag } from "next/cache";

const AdminProjectSlot = async () => {
  const projects = await fetchProjects();
  const techs = await fetchTechs();

  const techsAsStrings = techs.data.map((tech: ITechStack) => tech.name);

  const refetchList = async () => {
    "use server";
    revalidateTag("projects");
  };
  return (
    <div className="container flex flex-col gap-3">
      <div className="relative mt-6 flex md:justify-center items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold md:text-center text-left">
          Admin | Projects
        </h1>
        <div className="flex w-max absolute top-1/2 right-0 -translate-y-1/2">
          <ProjectFormRenderer refetchList={refetchList} techs={techs.data} />
        </div>
      </div>
      <div className="flex justify-center items-start">
        {!projects.data || !techsAsStrings ? (
          <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background">
            <Loader size={16} className="animate animate-spin w-max h-max" />
          </div>
        ) : (
          <ProjectTable
            techs={techsAsStrings}
            projects={projects.data}
            refetch={refetchList}
          />
        )}
      </div>
    </div>
  );
};
export default AdminProjectSlot;

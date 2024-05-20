import { fetchTechs } from "@/actions/techs";
import ProjectFormRenderer from "@/components/admin/project/ProjectFormRenderer";
import { ITechStack } from "@/models/tech";
import { revalidateTag } from "next/cache";

interface EditProjectProps<T> {
  params: T;
}

const EditProject = async ({ params }: EditProjectProps<{ id: string }>) => {
  const id = params.id;

  const techs = await fetchTechs();

  const refetchList = async () => {
    "use server";
    revalidateTag("projects");
  };
  return (
    <ProjectFormRenderer techs={techs.data} id={id} refetchList={refetchList} />
  );
};
export default EditProject;

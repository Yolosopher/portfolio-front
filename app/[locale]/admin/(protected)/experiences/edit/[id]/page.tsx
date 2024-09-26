import ExperienceFormRenderer from "@/components/admin/experience/ExperienceFormRenderer";
import { revalidateTag } from "next/cache";

interface EditExperienceProps<T> {
  params: T;
}

const EditExperience = ({ params }: EditExperienceProps<{ id: string }>) => {
  const id = params.id;

  const refetchList = async () => {
    "use server";
    revalidateTag("experiences");
  };
  return <ExperienceFormRenderer id={id} refetchList={refetchList} />;
};
export default EditExperience;

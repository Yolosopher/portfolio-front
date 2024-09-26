import EducationFormRenderer from "@/components/admin/education/EducationFormRenderer";
import { revalidateTag } from "next/cache";

interface EditEducationProps<T> {
  params: T;
}

const EditEducation = ({ params }: EditEducationProps<{ id: string }>) => {
  const id = params.id;

  const refetchList = async () => {
    "use server";
    revalidateTag("educations");
  };
  return <EducationFormRenderer id={id} refetchList={refetchList} />;
};
export default EditEducation;

import TechFormRenderer from "@/components/admin/tech/TechFormRenderer";
import { revalidateTag } from "next/cache";

interface EditTechProps<T> {
  params: T;
}

const EditTech = ({ params }: EditTechProps<{ id: string }>) => {
  const id = params.id;

  const refetchList = async () => {
    "use server";
    revalidateTag("techs");
  };
  return <TechFormRenderer id={id} refetchList={refetchList} />;
};
export default EditTech;

import { fetchEducations } from "@/actions/educations";
import EducationFormRenderer from "@/components/admin/education/EducationFormRenderer";
import EducationTable from "@/components/admin/education/EducationTable";
import { Loader } from "lucide-react";
import { revalidateTag } from "next/cache";

const AdminEducationSlot = async () => {
  const { data } = await fetchEducations();

  const refetchList = async () => {
    "use server";
    revalidateTag("educations");
  };
  return (
    <>
      <div className="container flex flex-col gap-3">
        <div className="relative mt-6 flex md:justify-center items-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold md:text-center text-left">
            Admin | Education
          </h1>
          <div className="flex w-max absolute top-1/2 right-0 -translate-y-1/2">
            <EducationFormRenderer refetchList={refetchList} />
          </div>
        </div>
        <div className="flex justify-center items-start">
          {!data ? (
            <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background">
              <Loader size={16} className="animate animate-spin w-max h-max" />
            </div>
          ) : (
            <EducationTable educations={data} refetch={refetchList} />
          )}
        </div>
      </div>
    </>
  );
};
export default AdminEducationSlot;

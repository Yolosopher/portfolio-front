"use client";
import useApiRequest from "@/hooks/request/useApiRequest";
import RenderTable from "../table/RenderTable";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ITechStack } from "@/models/tech";
import { IExperience } from "@/models/experience";

const experienceHeads = [
  {
    label: "ID",
    value: "_id",
  },
  {
    label: "Position",
    value: "position",
  },
  {
    label: "Company",
    value: "company",
  },
  {
    label: "Location",
    value: "location",
  },
  {
    label: "Employment Type",
    value: "work_hours",
  },
  {
    label: "Start Date",
    value: "start_date",
  },
  {
    label: "End Date",
    value: "end_date",
  },
  {
    label: "Description",
    value: "description",
  },
];
const ExperienceTable = ({
  experiences,
  refetch,
}: {
  experiences: IExperience[];
  refetch: () => Promise<void>;
}) => {
  const router = useRouter();
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const deleteExperience = async (id: string) => {
    try {
      const result = await request({
        url: `/experience/${id}`,
        method: "DELETE",
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          // success response
          toast({
            title: "Success",
            description:
              result.data.message ?? "Experience deleted successfully",
          });
          refetch();
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    }
  };

  return (
    <RenderTable
      heads={experienceHeads}
      rows={experiences}
      dateKeys={["start_date", "end_date"]}
      actions={
        new Map([
          [
            "edit",
            (id) =>
              router.push(`/admin/experiences/edit/${id}`, {
                scroll: true,
              }),
          ],
          ["delete", (id) => deleteExperience(id)],
        ])
      }
    />
  );
};

export default ExperienceTable;

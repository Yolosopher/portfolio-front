"use client";
import useApiRequest from "@/hooks/request/useApiRequest";
import RenderTable from "../table/RenderTable";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { ITechStack } from "@/models/tech";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const techHeads = [
  {
    label: "ID",
    value: "_id",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Icon",
    value: "icon",
  },
  {
    label: "Level",
    value: "level",
  },
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Description",
    value: "description",
  },
];
const TechTable = ({
  techs,
  refetch,
}: {
  techs: ITechStack[];
  refetch: () => Promise<void>;
}) => {
  const router = useRouter();
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const deleteTech = async (id: string) => {
    try {
      const result = await request({
        url: `/tech/${id}`,
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
            description: result.data.message ?? "Tech deleted successfully",
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
      heads={techHeads}
      rows={techs}
      imageKey="icon"
      actions={
        new Map([
          [
            "edit",
            (id) =>
              router.push(`/admin/tech/edit/${id}`, {
                scroll: true,
              }),
          ],
          ["delete", (id) => deleteTech(id)],
        ])
      }
    />
  );
};

export default TechTable;

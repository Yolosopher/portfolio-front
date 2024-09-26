"use client";
import useApiRequest from "@/hooks/request/useApiRequest";
import RenderTable from "../table/RenderTable";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "@/i18n/routing";
import { toast } from "@/components/ui/use-toast";
import { IEducation } from "@/models/education";

const educationHeads = [
    {
        label: "ID",
        value: "_id",
    },
    {
        label: "Field",
        value: "field",
    },
    {
        label: "University",
        value: "university",
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
const EducationTable = ({
    educations,
    refetch,
}: {
    educations: IEducation[];
    refetch: () => Promise<void>;
}) => {
    const router = useRouter();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();

    const deleteEducation = async (id: string) => {
        try {
            const result = await request({
                url: `/education/${id}`,
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
                            result.data.message ??
                            "Education deleted successfully",
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
            heads={educationHeads}
            rows={educations}
            dateKeys={["start_date", "end_date"]}
            actions={
                new Map([
                    [
                        "edit",
                        (id) =>
                            router.push(`/admin/educations/edit/${id}`, {
                                scroll: true,
                            }),
                    ],
                    ["delete", (id) => deleteEducation(id)],
                ])
            }
        />
    );
};

export default EducationTable;

"use client";
import useApiRequest from "@/hooks/request/useApiRequest";
import RenderTable from "../table/RenderTable";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { IProject } from "@/models/project";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ITechStack } from "@/models/tech";
import { Eye, EyeOff } from "lucide-react";

const projectHeads = [
    {
        label: "ID",
        value: "_id",
    },
    {
        label: "Name",
        value: "name",
    },
    {
        label: "Image",
        value: "image",
    },
    {
        label: "Github links",
        value: "github",
    },
    {
        label: "Preview",
        value: "preview",
    },
    {
        label: "Stack",
        value: "stack",
    },
    {
        label: "Priority",
        value: "priority",
    },
    {
        label: "Description",
        value: "description",
    },
    {
        label: <EyeOff />,
        value: "hidden",
    },
];
const ProjectTable = ({
    projects,
    refetch,
    techs,
}: {
    projects: IProject[];
    techs: string[];
    refetch: () => Promise<void>;
}) => {
    const router = useRouter();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();

    const deleteProject = async (id: string) => {
        try {
            const result = await request({
                url: `/project/${id}`,
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
                            "Project deleted successfully",
                    });
                    refetch();
                }
            }
        } catch (error: any) {
            errorHandler(error.message);
        }
    };

    const toggleVisibility = async (id: string) => {
        try {
            const result = await request({
                url: `/project/${id}`,
                method: "PATCH",
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
                            "Project visibility updated successfully",
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
            heads={projectHeads}
            rows={projects.map((project: IProject) => {
                return {
                    ...project,
                    stack: project.stack
                        .map((_: ITechStack) => _.name)
                        .join(", "),
                    hidden: (
                        <div
                            className="cursor-pointer"
                            onClick={() => toggleVisibility(project._id)}
                        >
                            {project.hidden ? <EyeOff /> : <Eye />}
                        </div>
                    ),
                };
            })}
            imageKeys={["image"]}
            links={["preview"]}
            actions={
                new Map([
                    [
                        "edit",
                        (id) =>
                            router.push(`/admin/projects/edit/${id}`, {
                                scroll: true,
                            }),
                    ],
                    ["delete", (id) => deleteProject(id)],
                ])
            }
        />
    );
};

export default ProjectTable;

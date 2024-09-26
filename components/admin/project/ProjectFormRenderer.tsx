/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { Button } from "@/components/ui/button";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import ProjectForm from "./ProjectForm";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "@/i18n/routing";
import { IProject } from "@/models/project";
import { ITechStack } from "@/models/tech";

const ProjectFormRenderer = ({
    id,
    refetchList,
    techs,
}: {
    techs: ITechStack[];
    id?: string;
    refetchList: () => Promise<void>;
}) => {
    const router = useRouter();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();
    const [open, setOpen] = useState<boolean>(!!id || false);
    const [projectData, setProjectData] = useState<IProject | null>(null);
    const [isClient, setIsClient] = useState<boolean>(false);

    const fetchProjectData = async () => {
        try {
            const result = await request({ url: `/project/${id}` });

            if (result) {
                if (!result.success) {
                    errorHandler(result.error);
                } else {
                    // success response
                    setProjectData(result.data.data);
                }
            }
        } catch (error: any) {
            errorHandler(error.message);
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (id) {
            // fetch project data
            fetchProjectData();
        }
    }, [id]);

    useEffect(() => {
        if (id && !open) {
            router.push("/admin/projects");
        }
    }, [id, open]);

    const refetch = async () => {
        if (id) {
            await fetchProjectData();
        }
        refetchList && refetchList();
    };

    return !isClient || (id && !projectData) ? null : (
        <DialogRenderer
            open={open}
            setOpen={setOpen}
            scroll
            trigger={
                <Button className={`w-full${id ? " hidden" : ""}`}>
                    {id ? "Edit Project" : "Add Project"}
                </Button>
            }
            content={
                <DialogContentRenderer
                    title={id ? "Edit Project" : "Add Project"}
                    description={id ? "Edit the project" : "Add a new project"}
                    content={
                        <ProjectForm
                            techs={techs}
                            refetch={refetch}
                            projectData={projectData}
                            closeDialog={() => setOpen(false)}
                        />
                    }
                />
            }
        />
    );
};
export default ProjectFormRenderer;

"use client";

import { useEffect, useState } from "react";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { Button } from "@/components/ui/button";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import TechForm from "./TechForm";
import { ITechStack } from "@/models/tech";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "@/i18n/routing";

const TechFormRenderer = ({
    id,
    refetchList,
}: {
    id?: string;
    refetchList: () => Promise<void>;
}) => {
    const router = useRouter();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();
    const [open, setOpen] = useState<boolean>(!!id || false);
    const [techData, setTechData] = useState<ITechStack | null>(null);
    const [isClient, setIsClient] = useState<boolean>(false);

    const fetchTechData = async () => {
        try {
            const result = await request({ url: `/tech/${id}` });

            if (result) {
                if (!result.success) {
                    errorHandler(result.error);
                } else {
                    // success response
                    setTechData(result.data.data);
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
            // fetch tech data
            fetchTechData();
        }
    }, [id]);

    useEffect(() => {
        if (id && !open) {
            router.push("/admin/tech");
        }
    }, [id, open]);

    const refetch = async () => {
        if (id) {
            await fetchTechData();
        }
        refetchList && refetchList();
    };

    return !isClient || (id && !techData) ? null : (
        <DialogRenderer
            open={open}
            setOpen={setOpen}
            scroll
            trigger={
                <Button className={`w-full${id ? " hidden" : ""}`}>
                    {id ? "Edit Tech" : "Add Tech"}
                </Button>
            }
            content={
                <DialogContentRenderer
                    title={id ? "Edit Tech" : "Add Tech"}
                    description={
                        id ? "Edit the tech stack" : "Add a new tech stack"
                    }
                    content={
                        <TechForm
                            refetch={refetch}
                            techData={techData}
                            closeDialog={() => setOpen(false)}
                        />
                    }
                />
            }
        />
    );
};
export default TechFormRenderer;

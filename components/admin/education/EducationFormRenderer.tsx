"use client";

import { useEffect, useState } from "react";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { Button } from "@/components/ui/button";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import EducationForm from "./EducationForm";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "@/i18n/routing";
import { IEducation } from "@/models/education";

const EducationFormRenderer = ({
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
    const [educationData, setEducationData] = useState<IEducation | null>(null);
    const [isClient, setIsClient] = useState<boolean>(false);

    const fetchEducationData = async () => {
        try {
            const result = await request({ url: `/education/${id}` });

            if (result) {
                if (!result.success) {
                    errorHandler(result.error);
                } else {
                    // success response
                    setEducationData(result.data.data);
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
            // fetch education data
            fetchEducationData();
        }
    }, [id]);

    useEffect(() => {
        if (id && !open) {
            router.push("/admin/educations");
        }
    }, [id, open]);

    const refetch = async () => {
        if (id) {
            await fetchEducationData();
        }
        refetchList && refetchList();
    };

    return !isClient || (id && !educationData) ? null : (
        <DialogRenderer
            open={open}
            setOpen={setOpen}
            scroll
            trigger={
                <Button className={`w-full${id ? " hidden" : ""}`}>
                    {id ? "Edit Education" : "Add Education"}
                </Button>
            }
            content={
                <DialogContentRenderer
                    title={id ? "Edit Education" : "Add Education"}
                    description={
                        id ? "Edit the education" : "Add a new education"
                    }
                    content={
                        <EducationForm
                            refetch={refetch}
                            educationData={educationData}
                            closeDialog={() => setOpen(false)}
                        />
                    }
                />
            }
        />
    );
};
export default EducationFormRenderer;

"use client";

import { useEffect, useState } from "react";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { Button } from "@/components/ui/button";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import ExperienceForm from "./ExperienceForm";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { useRouter } from "next/navigation";
import { IExperience } from "@/models/experience";

const ExperienceFormRenderer = ({
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
  const [experienceData, setExperienceData] = useState<IExperience | null>(
    null
  );
  const [isClient, setIsClient] = useState<boolean>(false);

  const fetchExperienceData = async () => {
    try {
      const result = await request({ url: `/experience/${id}` });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          // success response
          setExperienceData(result.data.data);
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
      // fetch experience data
      fetchExperienceData();
    }
  }, [id]);

  useEffect(() => {
    if (id && !open) {
      router.push("/admin/experiences");
    }
  }, [id, open]);

  const refetch = async () => {
    if (id) {
      await fetchExperienceData();
    }
    refetchList && refetchList();
  };

  return !isClient || (id && !experienceData) ? null : (
    <DialogRenderer
      open={open}
      setOpen={setOpen}
      scroll
      trigger={
        <Button className={`w-full${id ? " hidden" : ""}`}>
          {id ? "Edit Experience" : "Add Experience"}
        </Button>
      }
      content={
        <DialogContentRenderer
          title={id ? "Edit Experience" : "Add Experience"}
          description={id ? "Edit the experience" : "Add a new experience"}
          content={
            <ExperienceForm
              refetch={refetch}
              experienceData={experienceData}
              closeDialog={() => setOpen(false)}
            />
          }
        />
      }
    />
  );
};
export default ExperienceFormRenderer;

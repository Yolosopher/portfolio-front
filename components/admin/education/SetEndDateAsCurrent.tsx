"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { useState } from "react";

type SetEndDateAsCurrentProps = {
  id: string;
  refetch: () => void | Promise<void>;
  disabled: boolean;
};

const SetEndDateAsCurrent = ({
  id,
  refetch,
  disabled,
}: SetEndDateAsCurrentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleFunction = async () => {
    try {
      const result = await request({
        url: id ? `/education/${id}` : "/education",
        method: "PATCH",
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: result.data.message ?? "Education added successfully",
          });
          refetch();
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button type="button" onClick={handleFunction} disabled={disabled}>
      Mark as Current
    </Button>
  );
};
export default SetEndDateAsCurrent;

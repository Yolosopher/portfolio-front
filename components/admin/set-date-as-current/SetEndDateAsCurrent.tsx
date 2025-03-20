"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Loader } from "lucide-react";
import { useState } from "react";

type SetEndDateAsCurrentProps = {
  id: string;
  refetch: () => void | Promise<void>;
  disabled: boolean;
  type: "education" | "experience";
};

const SetEndDateAsCurrent = ({
  id,
  refetch,
  disabled,
  type,
}: SetEndDateAsCurrentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleFunction = async () => {
    try {
      setLoading(true);
      const result = await request({
        url:
          type === "education"
            ? `/education/${id}`
            : `/experience/${id}`,
        method: "PATCH",
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description:
              result.data.message ??
              (type === "education"
                ? "Education updated successfully"
                : "Experience updated successfully"),
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
    <Button
      type="button"
      onClick={handleFunction}
      disabled={disabled || loading}
    >
      {loading && <Loader size={16} className="animate animate-spin" />}
      {loading ? "Processing..." : "Mark as Current"}
    </Button>
  );
};
export default SetEndDateAsCurrent;

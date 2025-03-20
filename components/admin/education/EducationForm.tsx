"use client";

import { useEffect, useMemo, useState } from "react";
import AdminInput from "../input/AdminInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { IEducation } from "@/models/education";
import DatePicker from "@/components/shared/date-picker/DatePicker";
import SetEndDateAsCurrent from "../set-date-as-current/SetEndDateAsCurrent";
import AdminTextArea from "../input/AdminTextArea";

type EducationFormProps = {
  educationData: IEducation | null;
  refetch: () => void | Promise<void>;
  closeDialog: () => void;
};

const EducationForm = ({
  refetch,
  educationData,
  closeDialog,
}: EducationFormProps) => {
  const id = useMemo(() => educationData?._id, [educationData]);
  const [loading, setLoading] = useState<boolean>(false);

  // string inputs
  const [university, setUniversity] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!educationData) {
      return;
    }
    setUniversity(educationData.university || "");
    setField(educationData.field || "");
    setDescription(educationData.description || "");
    setStartDate(new Date(educationData.start_date) || undefined);
    setEndDate(
      educationData.end_date ? new Date(educationData.end_date) : undefined
    );
  }, [educationData]);

  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      // validate form
      if (!field) {
        throw new Error("Field is required");
      }

      const payload: any = {
        field,
      };

      if (university) {
        payload.university = university;
      }

      if (description) {
        payload.description = description;
      }
      if (startDate) {
        payload.start_date = startDate;
      }
      if (endDate) {
        payload.end_date = endDate;
      }

      const result = await request({
        url: id ? `/education/${id}` : "/education",
        method: id ? "PUT" : "POST",
        body: payload,
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
          if (!id) {
            closeDialog();
          }
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 px-2">
        <AdminInput
          disabled={loading}
          label="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="Type field here..."
        />
        <AdminInput
          disabled={loading}
          label="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="type university here..."
        />
        <AdminTextArea
          disabled={loading}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type description here..."
        />
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          wFull
          label="Start Date"
        />
        <div className="flex items-end justify-between gap-2">
          <DatePicker
            date={endDate}
            setDate={setEndDate}
            wFull
            label="End Date"
            className="pb-0 mb-0"
            emptyText="Present"
          />
          {id && educationData?.end_date && (
            <div className="self-end">
              <SetEndDateAsCurrent
                refetch={refetch}
                id={id}
                disabled={loading}
                type="education"
              />
            </div>
          )}
        </div>
      </div>
      <Separator className="my-3" />
      <Button
        disabled={loading}
        type="submit"
        className="max-w-[180px] w-full mx-auto"
      >
        {loading && <Loader size={16} className="animate animate-spin" />}
        {loading
          ? `${id ? "Updating..." : "Adding..."}`
          : `${id ? "Update" : "Add"}`}
      </Button>
    </form>
  );
};
export default EducationForm;

"use client";

import { useEffect, useMemo, useState } from "react";
import AdminInput from "../input/AdminInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { IExperience, WorkHours } from "@/models/experience";
import DatePicker from "@/components/shared/date-picker/DatePicker";
import SetEndDateAsCurrent from "../set-date-as-current/SetEndDateAsCurrent";
import RadioInput from "@/components/shared/radio-input/radio-input";
import { DayPickerProvider } from "react-day-picker";
import AdminTextArea from "../input/AdminTextArea";

type ExperienceFormProps = {
  experienceData: IExperience | null;
  refetch: () => void | Promise<void>;
  closeDialog: () => void;
};

const ExperienceForm = ({
  refetch,
  experienceData,
  closeDialog,
}: ExperienceFormProps) => {
  const id = useMemo(() => experienceData?._id, [experienceData]);
  const [loading, setLoading] = useState<boolean>(false);

  // string inputs
  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [workHours, setWorkHours] = useState<WorkHours>(WorkHours.INTERNSHIP);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!experienceData) {
      return;
    }
    setCompany(experienceData.company || "");
    setLocation(experienceData.location || "");
    setPosition(experienceData.position || "");
    setDescription(experienceData.description || "");
    setStartDate(new Date(experienceData.start_date) || undefined);
    setEndDate(
      experienceData.end_date ? new Date(experienceData.end_date) : undefined
    );
    setWorkHours(experienceData.work_hours || WorkHours.INTERNSHIP);
  }, [experienceData]);

  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      // validate form
      if (!position) {
        throw new Error("Position is required");
      }

      const payload: any = {
        position,
      };

      if (company) {
        payload.company = company;
      }

      if (workHours) {
        payload.work_hours = workHours;
      }

      if (location) {
        payload.location = location;
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
        url: id ? `/experience/${id}` : "/experience",
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
            description: result.data.message ?? "Experience added successfully",
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
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Type position here..."
        />
        <AdminInput
          disabled={loading}
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="type company here..."
        />
        <AdminInput
          disabled={loading}
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="type location here..."
        />
        <RadioInput
          name="work_hours"
          label="Employment Type"
          value={workHours}
          className="mt-1"
          radioGroupClassName="pt-1 mb-0"
          setValue={setWorkHours}
          options={[
            { label: WorkHours.FULL_TIME, value: WorkHours.FULL_TIME },
            { label: WorkHours.PART_TIME, value: WorkHours.PART_TIME },
            { label: WorkHours.INTERNSHIP, value: WorkHours.INTERNSHIP },
          ]}
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
          {id && experienceData?.end_date && (
            <div className="self-end">
              <SetEndDateAsCurrent
                refetch={refetch}
                id={id}
                disabled={loading}
                type="experience"
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
export default ExperienceForm;

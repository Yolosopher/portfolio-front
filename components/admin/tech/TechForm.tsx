"use client";

import { useState } from "react";
import AdminInput from "../input/AdminInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LEVEL } from "@/models/tech";
import RangeInput from "../../shared/input/RangeInput";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import ImageStore from "../image-store/ImageStore";
import RenderImage from "@/components/shared/image/RenderImage";

type TechFormProps = {
  edit?: boolean;
  closeDialog: () => void;
};

const TechForm = ({ edit, closeDialog }: TechFormProps) => {
  const [choosenImageName, setChoosenImageName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<LEVEL>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      // validate form
      if (!name || !choosenImageName) {
        throw new Error("Name and image are required");
      }

      const payload: any = {
        name,
        description,
        level,
        icon: choosenImageName,
      };

      const result = await request({
        url: "/tech",
        method: "POST",
        body: payload,
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: result.data.message ?? "Tech added successfully",
          });
          closeDialog();
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
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type name here..."
        />
        <AdminInput
          disabled={loading}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type description here..."
        />
        <RangeInput
          disabled={loading}
          label="Level"
          value={level}
          min={1}
          max={10}
          step={1}
          setChange={(val: number) => setLevel(val as LEVEL)}
          className="w-full"
        />
        <div className="flex gap-3 items-center">
          <ImageStore
            choosenImageName={choosenImageName}
            setChoosenImageName={setChoosenImageName}
          />
          {choosenImageName ? (
            <>
              <RenderImage
                name={choosenImageName}
                className="w-20 h-14 border-4 border-primary rounded-md object-cover aspect-[unset]"
              />
            </>
          ) : null}
        </div>
      </div>
      <Separator className="my-3" />
      <Button
        disabled={loading}
        type="submit"
        className="max-w-[180px] w-full mx-auto"
      >
        {loading && <Loader size={16} className="animate animate-spin" />}
        {loading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
};
export default TechForm;

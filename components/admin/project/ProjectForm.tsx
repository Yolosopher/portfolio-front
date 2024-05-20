"use client";

import { useEffect, useMemo, useState } from "react";
import AdminInput from "../input/AdminInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import ImageStore from "../image-store/ImageStore";
import RenderImage from "@/components/shared/image/RenderImage";
import { IProject } from "@/models/project";
import { MultiSelect, OptionType } from "../multi-select/MultiSelect";
import { ITechStack } from "@/models/tech";

/*
  _id: string;
  name: string;
  description: string;
  github: string;
  preview: string;
  image: string;
  stack: string[];
*/

type ProjectFormProps = {
  projectData: IProject | null;
  techs: ITechStack[];
  refetch: () => void | Promise<void>;
  closeDialog: () => void;
};

const ProjectForm = ({
  techs,
  refetch,
  projectData,
  closeDialog,
}: ProjectFormProps) => {
  const id = useMemo(() => projectData?._id, [projectData]);
  const [loading, setLoading] = useState<boolean>(false);

  // image inputs
  const [choosenImageName, setChoosenImageName] = useState<string>(
    projectData?.image || ""
  );

  // string inputs
  const [group, setGroup] = useState<string>(projectData?.group || "");
  const [name, setName] = useState<string>(projectData?.name || "");
  const [description, setDescription] = useState<string>(
    projectData?.description || ""
  );
  const [github, setGithub] = useState<string>(projectData?.github || "");
  const [preview, setPreview] = useState<string>(projectData?.preview || "");

  //  select inputs
  const [selectedValues, setSelectedValues] = useState<string[]>(
    (projectData?.stack && projectData.stack.map(({ _id }: any) => _id)) || []
  );

  const handleSelect = (value: string, checked: boolean) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value]
    );
  };

  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      // validate form
      if (!name) {
        throw new Error("Name is required");
      }

      const payload: any = {
        name,
      };

      if (description) {
        payload.description = description;
      }
      if (choosenImageName) {
        payload.image = choosenImageName;
      }
      if (selectedValues.length) {
        payload.stack = selectedValues;
      }
      if (github) {
        payload.github = github;
      }
      if (preview) {
        payload.preview = preview;
      }
      if (group) {
        payload.group = group;
      }

      const result = await request({
        url: id ? `/project/${id}` : "/project",
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
            description: result.data.message ?? "Project added successfully",
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
        <AdminInput
          disabled={loading}
          label="Github Link"
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="Paste github linke here..."
        />
        <AdminInput
          disabled={loading}
          label="Preview Link"
          type="url"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Paste preview linke here..."
        />
        <MultiSelect
          options={techs.map((tech) => ({
            label: tech.name,
            value: tech._id,
            checked: selectedValues.includes(tech._id),
            disabled: loading,
          }))}
          label="Used Tech Stack"
          action={handleSelect}
        />
        <div className="flex flex-col gap-3 items-center w-full">
          <ImageStore
            choosenImageName={choosenImageName}
            setChoosenImageName={setChoosenImageName}
          />
        </div>
      </div>
      <Separator className="my-3" />
      <AdminInput
        disabled={loading}
        label="Group"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        placeholder="type group here..."
      />
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
export default ProjectForm;

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
import AdminTextArea from "../input/AdminTextArea";
import RangeInput from "@/components/shared/input/RangeInput";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import randomUID from "@/lib/randomUID";

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
    const uniqueIdForSwitch = randomUID();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();
    const id = useMemo(() => projectData?._id, [projectData]);
    const [loading, setLoading] = useState<boolean>(false);

    // image inputs
    const [choosenImageName, setChoosenImageName] = useState<string>("");

    // string inputs
    const [group, setGroup] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [github, setGithub] = useState<string>("");
    const [preview, setPreview] = useState<string>("");
    const [priority, setPriority] = useState<number>(0);
    const [hidden, setHidden] = useState<boolean>(false);

    //  select inputs
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelect = (value: string, checked: boolean) => {
        setSelectedValues((prev) =>
            prev.includes(value)
                ? prev.filter((val) => val !== value)
                : [...prev, value]
        );
    };

    useEffect(() => {
        if (!projectData) {
            return;
        }
        setGroup(projectData.group || "");
        setName(projectData.name || "");
        setDescription(projectData.description || "");
        setGithub(projectData.github || "");
        setPreview(projectData.preview || "");
        setChoosenImageName(projectData.image || "");
        setPriority(projectData.priority || 0);
        setSelectedValues(
            (projectData?.stack &&
                projectData.stack.map(({ _id }: any) => _id)) ||
                []
        );
        setHidden(projectData.hidden || false);
    }, [projectData]);

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
            if (priority) {
                payload.priority = priority;
            }
            if (group) {
                payload.group = group;
            }
            payload.hidden = hidden;

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
                        description:
                            result.data.message ?? "Project added successfully",
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
                <RangeInput
                    disabled={loading}
                    label="Priority"
                    value={priority}
                    min={-20}
                    max={20}
                    step={1}
                    setChange={(val: number) => setPriority(val)}
                    className="w-full"
                />
                <AdminTextArea
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
            <div className="flex flex-col gap-2 w-full">
                <Label htmlFor={uniqueIdForSwitch} className="pl-2">
                    Hidden
                </Label>
                <Switch
                    id={uniqueIdForSwitch}
                    checked={hidden}
                    onCheckedChange={(chkd: boolean) => setHidden(chkd)}
                    disabled={loading}
                />
            </div>
            <Separator className="my-3" />
            <Button
                disabled={loading}
                type="submit"
                className="max-w-[180px] w-full mx-auto"
            >
                {loading && (
                    <Loader size={16} className="animate animate-spin" />
                )}
                {loading
                    ? `${id ? "Updating..." : "Adding..."}`
                    : `${id ? "Update" : "Add"}`}
            </Button>
        </form>
    );
};
export default ProjectForm;

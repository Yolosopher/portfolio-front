"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import CONFIG from "@/config";
import randomUID from "@/lib/randomUID";
import { cn, getFileExtension } from "@/lib/utils";
import { Loader, Upload } from "lucide-react";

interface UploadInputProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  setFile: (file: File | null) => void;
  className?: string;
  label: string;
  instruction?: string;
  cb?: () => void | Promise<void>;
}

const UploadInput = ({
  cb,
  label,
  instruction,
  setFile,
  className,
  ...args
}: UploadInputProps) => {
  const uniqueId = randomUID();
  const clearFileInput = (fileInput: HTMLInputElement) => {
    try {
      fileInput.value = "";
      if (fileInput.value) {
        fileInput.type = "text";
        fileInput.type = "file";
      }
    } catch (e) {
      // ignore
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearFileInput(e.target);
      setFile(null);
    } else {
      const ext = getFileExtension(file!.name); // without the dot

      if (!CONFIG.allowed_image_extensions.includes(ext)) {
        toast({
          title: "Error",
          description: `Invalid file type. Allowed types are ${CONFIG.allowed_image_extensions.join(
            ", "
          )}`,
          variant: "destructive",
        });
        clearFileInput(e.target);
        return e.preventDefault();
      }
      setFile(file);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={uniqueId} className="pl-2">
        {label}
      </Label>
      <Label
        className={cn(
          "relative overflow-hidden flex flex-col gap-2 rounded-md justify-center items-center h-20 border-2 border-dashed border-gray-300 cursor-pointer w-full text-gray-400",
          className
        )}
        {...args}
      >
        {args.disabled && (
          <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background">
            <Loader size={16} className="animate animate-spin w-max h-max" />
          </div>
        )}
        <Upload />
        <span>{instruction ?? "Click to select image"}</span>
        <Input
          id={uniqueId}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </Label>
      {cb && (
        <Button
          type="button"
          onClick={cb}
          variant={"secondary"}
          size={"sm"}
          className="w-max self-center mt-3"
        >
          Upload Image
        </Button>
      )}
    </div>
  );
};
export default UploadInput;

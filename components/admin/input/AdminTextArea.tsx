"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import randomUID from "@/lib/randomUID";

interface AdminTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const AdminTextArea = ({ label, ...args }: AdminTextAreaProps) => {
  const uniqueId = randomUID();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={uniqueId} className="pl-2">
        {label ?? args.name}
      </Label>
      <Textarea id={uniqueId} {...args} />
    </div>
  );
};

export default AdminTextArea;

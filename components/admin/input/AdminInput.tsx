"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import randomUID from "@/lib/randomUID";

interface AdminInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  textarea?: boolean;
}

const AdminInput = ({ textarea, label, ...args }: AdminInputProps) => {
  const uniqueId = randomUID();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={uniqueId} className="pl-2">
        {label ?? args.name}
      </Label>
      {textarea ? (
        <Textarea id={uniqueId} {...args} />
      ) : (
        <Input id={uniqueId} {...args} />
      )}
    </div>
  );
};
export default AdminInput;

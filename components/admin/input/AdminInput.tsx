"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import randomUID from "@/lib/randomUID";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const AdminInput = ({ label, ...args }: AdminInputProps) => {
  const uniqueId = randomUID();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={uniqueId} className="pl-2">
        {label ?? args.name}
      </Label>
      <Input id={uniqueId} {...args} />
    </div>
  );
};
export default AdminInput;

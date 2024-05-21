"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const DatePicker = ({
  date,
  setDate,
  label,
  wFull,
}: {
  wFull?: boolean;
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2 w-full pb-1">
      <Label onClick={() => setOpen(true)} className="pl-2">
        {label ?? "Pick a date"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              wFull ? "w-full" : "w-[280px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DatePicker;

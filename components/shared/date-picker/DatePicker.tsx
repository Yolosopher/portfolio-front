"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { addDays, format, setYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DayPicker,
  DayPickerProvider,
  useDayPicker,
  useNavigation,
} from "react-day-picker";
import MonthPicker from "./MonthPicker";

type LayoutType = "months" | "days";

const DatePicker = ({
  date,
  setDate,
  label,
  wFull,
  className,
  labelClassName,
  emptyText,
  defaultLayout,
}: {
  wFull?: boolean;
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  labelClassName?: string;
  emptyText?: string;
  defaultLayout?: LayoutType;
}) => {
  const [layout, setLayout] = useState<LayoutType>(defaultLayout ?? "months");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cn("flex flex-col gap-2 w-full pb-1", className)}>
      <Label
        onClick={() => setOpen(true)}
        className={cn("pl-2", labelClassName)}
      >
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
            {date ? (
              format(date, layout === "months" ? "MMM, yyyy" : "PP")
            ) : emptyText ? (
              <span>{emptyText}</span>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col px-2 py-2"
          align="start"
        >
          <div className="flex flex-col items-center justify-between py-2 gap-0">
            <div className="text-secondary-foreground font-bold uppercase">
              Layout Type
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={"secondary"}
                size={"sm"}
                type="button"
                aria-label="change calendar type"
                onClick={() => setLayout("days")}
                disabled={layout === "days"}
                autoFocus={false}
              >
                Days
              </Button>
              <Button
                variant={"secondary"}
                size={"sm"}
                type="button"
                aria-label="change calendar type"
                onClick={() => setLayout("months")}
                disabled={layout === "months"}
                autoFocus={false}
              >
                Months
              </Button>
            </div>
          </div>
          <div className="rounded-md border flex flex-col select-none ">
            {layout === "months" ? (
              <MonthPicker
                currentMonth={date ?? new Date()}
                onMonthChange={(newDate) => {
                  setDate(newDate);
                  setOpen(false);
                }}
              />
            ) : (
              <Calendar mode="single" selected={date} onSelect={setDate} />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DatePicker;

{
  /* <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              // fromYear={yearNav - 10}
              // toYear={yearNav}
              // captionLayout="dropdown-buttons"
              components={{
                // Dropdown: (props) => {
                //   "use client";
                //   const { goToDate } = useNavigation();

                //   return (
                //     <div className="flex">
                //       {props.name === "years" ? (
                //         <Select
                //           onValueChange={(yearVal) => {
                //             goToDate(
                //               setYear(date ?? new Date(), parseInt(yearVal))
                //             );
                //           }}
                //         >
                //           <SelectTrigger>
                //             <SelectValue placeholder="Select Year" />
                //           </SelectTrigger>
                //           <SelectContent position="popper">
                //             {Array.from({ length: 10 }, (_, i) => {
                //               const year = current_year - (i + 1);
                //               return (
                //                 <SelectItem key={year} value={year.toString()}>
                //                   {year}
                //                 </SelectItem>
                //               );
                //             })}
                //           </SelectContent>
                //         </Select>
                //       ) : null}
                //     </div>
                //   );
                // },
                Months: (props) => {
                  console.log(props.children);
                  return (
                    <div className="flex flex-wrap gap-2">
                      {props.children}
                      hey there
                    </div>
                  );
                },
              }}
            /> */
}

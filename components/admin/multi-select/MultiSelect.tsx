"use client";

import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

export type OptionType = {
  label: string;
  value: string;
  disabled?: boolean;
  checked: boolean;
};

interface MultiSelectProps {
  label?: string;
  options: OptionType[];
  action: (value: string, checked: boolean) => void;
}

export function MultiSelect({ label, options, action }: MultiSelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const selectedOptions = useMemo(() => {
    return options
      .filter((option) => option.checked)
      .map((option) => option.label);
  }, [options]);
  const sortedOptions = useMemo(() => {
    return options.sort((a, b) => {
      if (a.checked && !b.checked) {
        return -1;
      }
      if (!a.checked && b.checked) {
        return 1;
      }
      return 0;
    });
  }, [options]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        className="pl-2"
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {label ?? "Select Options"}
      </Label>
      <DropdownMenu open={open} onOpenChange={(op) => setOpen(op)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="line-clamp-3 whitespace-normal min-h-max h-[unset]"
          >
            {selectedOptions.length > 0 ? selectedOptions.join(", ") : "None"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 h-56">
          <ScrollArea className="w-full h-full">
            {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
            {/* <DropdownMenuSeparator /> */}

            {options.map(({ label, value, disabled, checked }, i) => (
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={(active) => action(value, active)}
                key={i}
                disabled={!!disabled}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

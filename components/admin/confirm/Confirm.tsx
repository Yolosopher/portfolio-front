"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

interface ConfirmProps {
  trigger: React.ReactNode;
  action?: () => void | Promise<void>;
  title?: string;
  description?: React.ReactNode | string;
  className?: string;
}

export function Confirm({
  action,
  title,
  description,
  trigger,
  className,
}: ConfirmProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={cn(className)}>
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>
            {title ?? "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? "This action cannot be undone"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!action && (
          <AlertDialogCancel asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="p-0 absolute top-2 right-2"
            >
              <X />
            </Button>
          </AlertDialogCancel>
        )}
        {action && (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="button"
              onClick={async () => {
                await action();
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

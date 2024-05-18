"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmProps {
  trigger: React.ReactNode;
  action: () => void | Promise<void>;
  title?: string;
  description?: string;
}

export function Confirm({ action, title, description, trigger }: ConfirmProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? "This action cannot be undone"}
          </AlertDialogDescription>
        </AlertDialogHeader>
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
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DialogRendererProps = {
  content: React.ReactNode;
  trigger: React.ReactNode;
  scroll?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export function DialogRenderer({
  open,
  setOpen,
  content,
  trigger,
  scroll,
}: DialogRendererProps) {
  return (
    <Dialog {...{ open: open, onOpenChange: setOpen }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", scroll ? "pr-1" : "")}>
        {scroll ? (
          <ScrollArea className="w-full h-96 pr-5">{content}</ScrollArea>
        ) : (
          content
        )}
      </DialogContent>
    </Dialog>
  );
}

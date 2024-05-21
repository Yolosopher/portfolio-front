import { Button } from "@/components/ui/button";
import { MediaSize } from "@/hooks/media-query/useMediaSize";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import React from "react";

type ScrollToSectionBtnProps = {
  mediaSize: MediaSize;
  text: string;
  cb: () => void;
  position: "up" | "down" | false;
};

function ScrollToSectionBtn({
  mediaSize,
  text,
  cb,
  position,
}: ScrollToSectionBtnProps) {
  return (
    <Button
      type="button"
      variant={"outline"}
      size={!mediaSize || mediaSize === "sm" ? "sm" : "lg"}
      className={cn(
        "flex gap-1 items-center",
        "shadow-[0_2px_50px_hsl(var(--primary)/0.8)] dark:shadow-[0_2px_50px_hsl(var(--primary)/0.5)]",
        "dark:!bg-white dark:!text-bluish !bg-primary !border-none !text-white"
      )}
      aria-label={`Scroll to ${text}`}
      onClick={cb}
    >
      {text}
      {position &&
        (position === "down" ? (
          <ArrowDownToLine
            className="flex-1"
            size={!mediaSize || mediaSize === "sm" ? 14 : 20}
          />
        ) : (
          <ArrowUpFromLine
            className="flex-1"
            size={!mediaSize || mediaSize === "sm" ? 14 : 20}
          />
        ))}
    </Button>
  );
}

export default ScrollToSectionBtn;

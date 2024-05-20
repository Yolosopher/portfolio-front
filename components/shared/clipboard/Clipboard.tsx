"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

type ClipboardProps = {
  content: string;
  className?: string;
  maxLength?: number;
  noIcon?: boolean;
};

const Clipboard = ({
  noIcon,
  maxLength,
  content,
  className,
}: ClipboardProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };
  return (
    <div
      className={cn(
        "inline-flex gap-x-4 gap-y-2 items-center rounded-md px-3 py-2 bg-secondary w-max",
        className,
        noIcon ? "cursor-pointer" : ""
      )}
      {...(noIcon && { onClick: copyToClipboard })}
    >
      {maxLength
        ? content.slice(0, maxLength) +
          (content.length > maxLength ? "..." : "")
        : content}
      {!noIcon && <Copy onClick={copyToClipboard} className="cursor-pointer" />}
    </div>
  );
};
export default Clipboard;
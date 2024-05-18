"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownToDot } from "lucide-react";

const ScrollToBottom = () => {
  const handleScroll = () => {
    if (window) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <Button
      type="button"
      variant={"default"}
      size={"icon"}
      onClick={handleScroll}
    >
      <ArrowDownToDot className="flex-shrink-0" />
    </Button>
  );
};
export default ScrollToBottom;

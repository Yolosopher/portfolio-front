"use client";

import { Button } from "@/components/ui/button";
import { bottomScrollContext } from "@/context/bottomScrollContext";
import { ArrowDownToDot } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ScrollToBottom = () => {
  const ctx = useContext(bottomScrollContext);
  const [hidden, setHidden] = useState<boolean>(!!ctx.fullyScrolled);

  const handleScroll = () => {
    if (window) {
      window.scrollBy({
        top: window.innerHeight - 144,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (ctx.fullyScrolled) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [ctx.fullyScrolled]);

  return hidden ? null : (
    <Button
      type="button"
      variant={"default"}
      size={"icon"}
      aria-label="Scroll to bottom"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-20"
      onClick={handleScroll}
    >
      <ArrowDownToDot className="flex-shrink-0" />
    </Button>
  );
};
export default ScrollToBottom;

"use client";
import { useMemo } from "react";
import useMediaQuery from "./useMediaQuery";

export type MediaSize = "sm" | "md" | "lg" | "xl" | "";

const useMediaSize = () => {
  const sm = useMediaQuery(640);
  const md = useMediaQuery(768);
  const lg = useMediaQuery(1024);
  const xl = useMediaQuery(1280);

  const mediaSize = useMemo(() => {
    if (xl) return "xl";
    if (lg) return "lg";
    if (md) return "md";
    if (sm) return "sm";
    return "";
  }, [sm, md, lg, xl]);

  return mediaSize;
};
export default useMediaSize;

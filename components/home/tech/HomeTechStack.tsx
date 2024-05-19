"use client";
import TechContent, { TechContentProps } from "@/components/tech/TechContent";
import SectionTitle from "../section-title/SectionTitle";
import { useInView } from "react-intersection-observer";
import useMediaSize from "@/hooks/media-query/useMediaSize";
import { useMemo } from "react";

export type SizeInfo = {
  cols: number;
  hiddenNumber: number;
};

const HomeTechStack = ({
  techs,
}: Omit<TechContentProps, "active" | "sizeInfo">) => {
  const mediaSize = useMediaSize();

  const sizeInfo = useMemo(() => {
    if (mediaSize === "xl")
      return {
        hiddenNumber: 11,
        cols: 5,
      };
    if (mediaSize === "lg")
      return {
        hiddenNumber: 9,
        cols: 4,
      };
    if (mediaSize === "md")
      return {
        hiddenNumber: 7,
        cols: 3,
      };
    return {
      hiddenNumber: 7,
      cols: 2,
    };
  }, [mediaSize]);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    // triggerOnce: true,
  });

  return (
    <div className="overflow-hidden">
      <section className="container py-44 ">
        <SectionTitle
          title="Tech Stack"
          description="Technologies I've been working with recently"
        />
        <div className="flex w-full min-h-[340px] overflow-visible" ref={ref}>
          <TechContent techs={techs} active={inView} sizeInfo={sizeInfo} />
        </div>
      </section>
    </div>
  );
};
export default HomeTechStack;

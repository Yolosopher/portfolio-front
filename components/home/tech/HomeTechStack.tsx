"use client";
import TechContent, { TechContentProps } from "@/components/tech/TechContent";
import SectionTitle from "../section-title/SectionTitle";
import { useInView } from "react-intersection-observer";

const HomeTechStack = ({ techs }: Omit<TechContentProps, "active">) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.2,
    // triggerOnce: true,
  });

  return (
    <section className="container py-44">
      <SectionTitle
        title="Tech Stack"
        description="Technologies I've been working with recently"
      />
      <div className="flex w-full min-h-[340px] overflow-hidden" ref={ref}>
        <TechContent techs={techs} active={inView} />
      </div>
    </section>
  );
};
export default HomeTechStack;

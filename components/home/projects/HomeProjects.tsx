/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ProjectContent, {
  ProjectsContentProps,
} from "@/components/projects/ProjectsContent";
import SectionTitle from "../section-title/SectionTitle";
import { useInView } from "react-intersection-observer";
import useMediaSize from "@/hooks/media-query/useMediaSize";
import { useContext, useEffect, useMemo } from "react";
import { homeScrollIds } from "@/config/homeScrollIds";
import { inViewContext } from "@/context/inViewContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeProjects = ({
  projects,
}: Omit<ProjectsContentProps, "active" | "sizeInfo">) => {
  const { updateViewInfo } = useContext(inViewContext);
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

  useEffect(() => {
    updateViewInfo(homeScrollIds.projects, inView);
  }, [inView]);

  return (
    <div className="overflow-hidden section-element">
      <section className="container pt-8 pb-44">
        <SectionTitle
          scrollLink={homeScrollIds.projects}
          title="Projects"
          description={
            <span>
              Some of the things I've build so far{" "}
              <span className="text-primary">(and I can legally share)</span>
            </span>
          }
        />
        <div
          className="flex justify-start w-full min-h-[567px] overflow-visible"
          ref={ref}
        >
          <ProjectContent
            projects={projects}
            active={inView}
            sizeInfo={sizeInfo}
          />
        </div>
        <div className="flex items-start justify-center w-full pt-8 pb-3">
          <Button asChild variant={"default"} size={"lg"}>
            <Link href="/projects">See All Projects</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
export default HomeProjects;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TechContent, { TechContentProps } from "@/components/tech/TechContent";
import SectionTitle from "../section-title/SectionTitle";
import { useInView } from "react-intersection-observer";
import useMediaSize from "@/hooks/media-query/useMediaSize";
import { useContext, useEffect, useMemo } from "react";
import { homeScrollIds } from "@/config/homeScrollIds";
import { inViewContext } from "@/context/inViewContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeTechStack = ({
    techs,
    separate,
}: Omit<TechContentProps, "active" | "sizeInfo"> & {
    separate?: boolean;
}) => {
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
        if (!separate) {
            updateViewInfo(homeScrollIds.techStack, inView);
        }
    }, [inView]);

    return (
        <div className="overflow-hidden section-element">
            <section className="container pt-8 pb-44">
                <SectionTitle
                    scrollLink={homeScrollIds.techStack}
                    title="Tech Stack"
                    description="Technologies I've been working with recently"
                />
                <div
                    className="flex justify-end w-full min-h-[340px] overflow-visible"
                    ref={ref}
                >
                    <TechContent
                        techs={techs}
                        active={inView}
                        sizeInfo={sizeInfo}
                    />
                </div>
                <div className="flex items-start justify-center w-full pt-12 pb-3">
                    <Button asChild variant={"shine"} size={"lg"}>
                        <Link href="/tech">See All Techs</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};
export default HomeTechStack;

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
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useServerT } from "@/actions/helperTranslation";

const HomeProjects = ({
    projects,
}: Omit<ProjectsContentProps, "active" | "sizeInfo">) => {
    const { t } = useServerT();
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
            <section className="container pt-8 pb-44 text-center">
                <SectionTitle
                    scrollLink={homeScrollIds.projects}
                    title={t("PROJECTS")}
                    description={
                        <span className="text-center">
                            {t("LATEST_PROJECTS_I_VE_WORKED_ON")}{" "}
                            <span className="text-primary block text-center">
                                ({t("AND_I_CAN_LEGALY_SHARE")})
                            </span>
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
                    <Button asChild variant={"shine"} size={"lg"}>
                        <Link href="/projects">{t("SEE_ALL_PROJECTS")}</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};
export default HomeProjects;

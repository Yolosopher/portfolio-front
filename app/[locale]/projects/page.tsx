/* eslint-disable react/no-unescaped-entities */
import { fetchProjects } from "@/actions/projects";
import SectionTitle from "@/components/home/section-title/SectionTitle";
import ProjectsItem from "@/components/projects/ProjectsItem";
import { poppins } from "@/lib/fonts";
import { getLocaleKey } from "@/lib/useT";
import { cn } from "@/lib/utils";
import { IProject } from "@/models/project";
import { Locales } from "@/types";
import { getTranslations } from "next-intl/server";

const Projects = async ({
    params: { locale },
}: {
    params: { locale: Locales };
}) => {
    const translations = await getTranslations("data");
    const t = (key: string) => translations(getLocaleKey(key, locale));

    const result = await fetchProjects("false");
    const projects = result.data as IProject[];
    return (
        <section className="container pt-8 sm:pt-10 lg:pt-16 xl:pt-20 pb-44">
            <SectionTitle
                title={t("PROJECTS")}
                description={
                    <span>
                        {t("LATEST_PROJECTS_I_VE_WORKED_ON")}{" "}
                        <span className="text-primary">
                            ({t("AND_I_CAN_LEGALY_SHARE")})
                        </span>
                    </span>
                }
                useH1
                alwaysLeft
            />
            <div className="flex justify-start w-full min-h-[567px] overflow-visible">
                <ul
                    className={cn(
                        poppins.className,
                        "grid gap-x-4 gap-y-6 xl:gap-x-12 xl:gap-y-16 justify-center justify-items-center origin-left transition w-full duration-700 ease-in",
                        `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`,
                        "translate-x-0 opacity-100 scale-x-100"
                    )}
                >
                    {projects.map((project, i) => (
                        <ProjectsItem key={project._id} {...project} />
                    ))}
                </ul>
            </div>
        </section>
    );
};
export default Projects;

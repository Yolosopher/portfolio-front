import { fetchEducations } from "@/actions/educations";
import { fetchExperiences } from "@/actions/experiences";
import { fetchSettings } from "@/actions/settings";
import Education from "@/components/resume/education/education";
import WorkExperience from "@/components/resume/work-experience/work-experience";
import SectionTitle from "@/components/home/section-title/SectionTitle";
import { Button } from "@/components/ui/button";
import { poppins } from "@/lib/fonts";
import { cn, getAge } from "@/lib/utils";
import { IEducation } from "@/models/education";
import { IExperience } from "@/models/experience";
import { ISetting } from "@/models/setting";
import { Cake, Download, FileDown, MapPin } from "lucide-react";
import {} from "date-fns";
import { Locales } from "@/types";
import { getTranslations } from "next-intl/server";
import { getLocaleKey } from "@/lib/useT";

const About = async ({
    params: { locale },
}: {
    params: { locale: Locales };
}) => {
    const translations = await getTranslations("data");
    const t = (key: string) => translations(getLocaleKey(key, locale));

    const settingResult = await fetchSettings();
    const experiencesResult = await fetchExperiences();
    const educationsResult = await fetchEducations();

    const setting = settingResult.data as ISetting;
    const experiences = experiencesResult.data as IExperience[];
    const educations = educationsResult.data as IEducation[];

    return (
        <div className="container pt-8 pb-44 sm:pt-10 lg:pt-16 xl:pt-20">
            <div className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[55%] xl:max-w-[55%] flex flex-col gap-10">
                <section className="pb-12">
                    <h1
                        className={cn(
                            poppins.className,
                            "font-bold text-4xl sm:text-5xl mb-6"
                        )}
                    >
                        Nika Nishnianidze
                    </h1>
                    <div className="flex flex-col gap-2 text-lg font-semibold">
                        <p className="flex items-center gap-2">
                            <Cake size={24} className="text-primary" />
                            <span className="pt-1.5">
                                April 20, 1998 ({getAge("04/20/1998")} YO)
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin size={24} className="text-primary" />
                            <span className="">Georgia, Tbilisi</span>
                        </p>
                    </div>
                </section>
                <section>
                    <div
                        className={cn(
                            poppins.className,
                            "text-bluish dark:text-[#CCCCCC] flex flex-col gap-4 sm:gap-7"
                        )}
                    >
                        <div className="relative w-full ">
                            <h2 className="font-bold text-3xl sm:text-[2.625rem]">
                                {t("ABOUT_ME")}
                            </h2>
                        </div>
                        <div
                            className={cn(
                                poppins.className,
                                "text-lg sm:text-lg"
                            )}
                            dangerouslySetInnerHTML={{
                                __html: setting.about_me ?? "",
                            }}
                        />
                    </div>
                </section>
                <section>
                    <WorkExperience experiences={experiences} />
                </section>
                <section>
                    <Education educations={educations} />
                </section>
                <Button
                    asChild
                    variant={"shine"}
                    className="top-0 sm:h-11 sm:rounded-md sm:px-7 self-center"
                >
                    <a
                        href={"/Nika_Nishnianidze.pdf"}
                        target="_blank"
                        download
                        data-umami-event="Download CV"
                        aria-label="Download CV"
                        className=" right-0 top-1/2 -translate-y-1/122 flex items-center gap-3"
                    >
                        <Download size={18} />
                        <span>{t("DOWNLOAD_CV")}</span>
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default About;

import { fetchEducations } from "@/actions/educations";
import { fetchExperiences } from "@/actions/experiences";
import { fetchSettings } from "@/actions/settings";
import Education from "@/components/about/education/education";
import WorkExperience from "@/components/about/work-experience/work-experience";
import SectionTitle from "@/components/home/section-title/SectionTitle";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IEducation } from "@/models/education";
import { IExperience } from "@/models/experience";
import { ISetting } from "@/models/setting";

const About = async () => {
  const settingResult = await fetchSettings();
  const experiencesResult = await fetchExperiences();
  const educationsResult = await fetchEducations();

  const setting = settingResult.data as ISetting;
  const experiences = experiencesResult.data as IExperience[];
  const educations = educationsResult.data as IEducation[];

  return (
    <div className="container pt-8 pb-44 sm:pt-10 lg:pt-16 xl:pt-20">
      <div className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[55%] xl:max-w-[55%] flex flex-col gap-10">
        <section>
          <div
            className={cn(
              poppins.className,
              "text-bluish dark:text-[#CCCCCC] flex flex-col gap-4 sm:gap-7"
            )}
          >
            <h1 className="font-bold text-3xl sm:text-[2.625rem]">About Me</h1>
            <p className={cn(poppins.className, "text-lg sm:text-lg")}>
              {/* {setting.about_me} */}
              The Generator App is an online tool that helps you to export
              ready-made templates ready to work as your future website. It
              helps you to combine slides, panels and other components and
              export it as a set of static files: HTML/CSS/JS.
            </p>
          </div>
        </section>
        <section>
          <WorkExperience experiences={experiences} />
        </section>
        <section>
          <Education educations={educations} />
        </section>
      </div>
    </div>
  );
};

export default About;

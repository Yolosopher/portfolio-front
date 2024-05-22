import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IExperience } from "@/models/experience";
import AboutItem from "../about-item/about-item";

type WorkExperienceProps = {
  experiences: IExperience[];
};

const WorkExperience = ({ experiences }: WorkExperienceProps) => {
  return (
    <>
      <div
        className={cn(
          poppins.className,
          "text-bluish dark:text-gr flex flex-col gap-4 sm:gap-7"
        )}
      >
        <h1 className="font-bold text-3xl sm:text-[2.625rem]">
          Work Experience
        </h1>
        <p className={cn(poppins.className, "text-lg sm:text-lg")}></p>
      </div>
      <ul className="flex flex-col gap-8">
        {experiences.map(
          ({
            _id,
            company,
            description,
            location,
            position,
            start_date,
            work_hours,
            end_date,
          }) => (
            <AboutItem
              key={_id}
              mainText={position}
              subText={company}
              start_date={new Date(start_date)}
              end_date={end_date ? new Date(end_date) : null}
              description={description}
              location={location}
              employmentType={work_hours ?? null}
            />
          )
        )}
      </ul>
    </>
  );
};
export default WorkExperience;

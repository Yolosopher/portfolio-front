import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IEducation } from "@/models/education";
import AboutItem from "../about-item/about-item";

type EducationProps = {
  educations: IEducation[];
};

const Education = ({ educations }: EducationProps) => {
  return (
    <>
      <div
        className={cn(
          poppins.className,
          "text-bluish dark:text-gr flex flex-col gap-4 sm:gap-7"
        )}
      >
        <h1 className="font-bold text-3xl sm:text-[2.625rem] dark:text-[#CCCCCC]">
          Education
        </h1>
        <p className={cn(poppins.className, "text-lg sm:text-lg")}></p>
      </div>
      <ul className="flex flex-col gap-8">
        {educations.map(
          ({ _id, university, description, field, start_date, end_date }) => (
            <AboutItem
              key={_id}
              mainText={field}
              subText={university}
              start_date={new Date(start_date)}
              end_date={end_date ? new Date(end_date) : null}
              description={description}
            />
          )
        )}
      </ul>
    </>
  );
};
export default Education;

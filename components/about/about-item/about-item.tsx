import { cn } from "@/lib/utils";
import { WorkHours } from "@/models/experience";
import { format } from "date-fns";
import { Building, CalendarDays, MapPin } from "lucide-react";

type AboutItemProps = {
  mainText: string;
  subText: string;
  start_date: Date;

  end_date?: Date | null;
  employmentType?: WorkHours | null;
  location?: string;
  description?: string;
};

const AboutItem = ({
  mainText,
  subText,
  start_date,
  end_date,
  location,
  employmentType,
  description,
}: AboutItemProps) => {
  return (
    <li className="w-full flex flex-col gap-0.5 text-gr pb-4 border-b-2 border-[#EBEAED] dark:border-bluish/50">
      <div className="flex items-center justify-between">
        <h3 className="text-xl tracking-wider sm:tracking-widest">
          {mainText}
        </h3>
        <div
          className={cn(
            "h-6 px-5 rounded-[100px] flex justify-center items-center text-[9px] font-semibold leading-[auto]",
            "bg-lightgreen text-[#018C0F] dark:bg-[#018C0F] dark:text-lightgreen"
          )}
        >
          {employmentType ? employmentType : WorkHours.FULL_TIME}
        </div>
      </div>
      <div className="flex items-start justify-between relative w-full">
        <p
          className={cn(
            "text-sm grid grid-cols-1 sm:grid-cols-2 sm:w-full",
            location ? "sm:max-w-sm" : ""
          )}
        >
          <span className="flex items-center gap-1">
            <Building size={14} />
            <span>{subText}</span>
          </span>
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{location}</span>
            </span>
          )}
        </p>
        <div className="flex items-center gap-1 absolute right-0 top-0 sm:static flex-shrink-0">
          <CalendarDays size={14} />
          <div className="flex items-center gap-0.5 text-sm">
            <time dateTime={format(start_date, "P")}>
              {format(start_date, "MMM yyyy")}
            </time>
            {end_date ? (
              <time dateTime={format(end_date, "P")}>
                - {format(end_date, "MMM yyyy")}
              </time>
            ) : (
              <span>- Present</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
export default AboutItem;

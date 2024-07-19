import { ITechStack } from "@/models/tech";
import TechItem from "./TechItem";
import { cn } from "@/lib/utils";
import { SizeInfo } from "@/types";

export type TechContentProps = {
  techs: ITechStack[];
  active: boolean;
  sizeInfo: SizeInfo;
};

const TechContent = ({ techs, active, sizeInfo }: TechContentProps) => {
  return (
    <ul
      className={cn(
        "grid gap-12 w-full xl:gap-x-[6.25rem] xl:gap-y-[3.75rem] justify-center justify-items-center transition duration-700 ease-in",
        `grid-cols-2 md:grid-cols-3 origin-right lg:grid-cols-4 xl:grid-cols-5`,
        active
          ? "translate-x-0 opacity-100 scale-x-100"
          : "translate-x-[15%] opacity-30 scale-x-[.9]"
      )}
    >
      {techs.map((tech, i) => (
        <TechItem
          key={tech._id}
          {...tech}
          showRange={active}
          hidden={i + 1 >= sizeInfo.hiddenNumber}
        />
      ))}
    </ul>
  );
};
export default TechContent;

import { ITechStack } from "@/models/tech";
import TechItem from "./TechItem";
import { cn } from "@/lib/utils";
import { SizeInfo } from "../home/tech/HomeTechStack";

export type TechContentProps = {
  techs: ITechStack[];
  active: boolean;
  sizeInfo: SizeInfo;
};

const TechContent = ({ techs, active, sizeInfo }: TechContentProps) => {
  return (
    <ul
      className={cn(
        "grid gap-12 xl:gap-x-[6.25rem] xl:gap-y-[3.75rem] justify-center justify-items-center  transition-all duration-700 ease-in",
        `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`,
        active
          ? "translate-x-0 opacity-100 w-full"
          : "translate-x-[10%] opacity-30 w-4/5"
      )}
      // style={{
      //   gridTemplateColumns: "repeat(auto-fill, minmax(60px, 120px))",
      // }}
    >
      {techs.map((tech, i) => (
        <TechItem
          key={tech._id}
          {...tech}
          hidden={i + 1 >= sizeInfo.hiddenNumber}
        />
      ))}
    </ul>
  );
};
export default TechContent;

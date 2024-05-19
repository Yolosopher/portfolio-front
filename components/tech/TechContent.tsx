import { ITechStack } from "@/models/tech";
import TechItem from "./TechItem";
import { cn } from "@/lib/utils";

export type TechContentProps = {
  techs: ITechStack[];
  active: boolean;
};

const TechContent = ({ techs, active }: TechContentProps) => {
  return (
    <ul
      className={cn(
        "[&>li:nth-child(n+11)]:hidden grid w-full gap-12 xl:gap-[6.25rem] justify-center justify-items-stretch sm:justify-between transition duration-1200 ease-in",
        active ? "translate-x-0 opacity-100 scale-100" : " opacity-100 scale-50"
      )}
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(60px, 120px))",
      }}
    >
      {techs.map((tech) => (
        <TechItem key={tech._id} {...tech} />
      ))}
    </ul>
  );
};
export default TechContent;

"use client";
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
        "grid w-full gap-12 xl:gap-[6.25rem] justify-center justify-items-center  transition duration-700 ease-in",
        `grid-cols-${sizeInfo.cols}`,
        active
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-[200px] opacity-70 scale-80"
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

import { fetchTechs } from "@/actions/techs";
import SectionTitle from "@/components/home/section-title/SectionTitle";
import TechItem from "@/components/tech/TechItem";
import { cn } from "@/lib/utils";
import { ITechStack } from "@/models/tech";

const Tech = async () => {
  const result = await fetchTechs();
  const techs = result.data as ITechStack[];
  return (
    <section className="container pt-8 sm:pt-10 lg:pt-16 xl:pt-20 pb-44">
      <SectionTitle
        title="Tech Stack"
        description="Technologies I've been working with recently"
        alwaysLeft
        useH1
      />
      <div className="flex justify-end w-full min-h-[340px] overflow-visible">
        <ul
          className={cn(
            "grid gap-12 w-full xl:gap-x-[6.25rem] xl:gap-y-[3.75rem] justify-center justify-items-center transition duration-700 ease-in",
            `grid-cols-2 md:grid-cols-3 origin-right lg:grid-cols-4 xl:grid-cols-5`,
            // active
            "translate-x-0 opacity-100 scale-x-100"
            // : "translate-x-[15%] opacity-30 scale-x-[.9]"
          )}
        >
          {techs.map((tech, i) => (
            <TechItem key={tech._id} {...tech} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Tech;

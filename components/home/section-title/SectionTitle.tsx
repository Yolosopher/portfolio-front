import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type SectionTiTleProps = {
  title: string;
  description?: string;
  scrollLink?: string;
};

const SectionTitle = ({
  title,
  description,
  scrollLink,
}: SectionTiTleProps) => {
  return (
    <div
      className={
        (poppins.className,
        "text-gr flex flex-col sm:items-center gap-1 sm:gap-[15px] mb-12 sm:mb-24")
      }
      {...(scrollLink && { id: scrollLink })}
    >
      <h2 className="font-bold text-3xl sm:text-5xl">{title}</h2>
      {description && (
        <p className={cn(poppins.className, "text-lg sm:text-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;

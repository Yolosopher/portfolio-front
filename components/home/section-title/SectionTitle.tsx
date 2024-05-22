import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type SectionTiTleProps = {
  title: string;
  description?: React.ReactNode;
  scrollLink?: string;
  alwaysLeft?: boolean;
};

const SectionTitle = ({
  alwaysLeft,
  title,
  description,
  scrollLink,
}: SectionTiTleProps) => {
  return (
    <div
      className={cn(
        poppins.className,
        "text-gr flex flex-col gap-1 sm:gap-[15px] mb-12 sm:mb-24",
        !alwaysLeft && "sm:items-center"
      )}
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

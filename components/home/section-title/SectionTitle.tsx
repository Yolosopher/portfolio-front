import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type SectionTiTleProps = {
  title: string;
  description?: React.ReactNode;
  scrollLink?: string;
  alwaysLeft?: boolean;
  useH1?: boolean;
};

const SectionTitle = ({
  alwaysLeft,
  title,
  description,
  scrollLink,
  useH1,
}: SectionTiTleProps) => {
  const As = useH1 ? "h1" : "h2";
  return (
    <div
      className={cn(
        poppins.className,
        "text-bluish dark:text-gr flex flex-col gap-1 sm:gap-[15px] mb-12 sm:mb-24",
        !alwaysLeft && "sm:items-center"
      )}
      {...(scrollLink && { id: scrollLink })}
    >
      <As className="font-bold text-3xl sm:text-5xl dark:text-[#CCCCCC]">
        {title}
      </As>
      {description && (
        <p className={cn(poppins.className, "text-lg sm:text-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;

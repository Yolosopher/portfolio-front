import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type SectionTiTleProps = {
  title: string;
  description?: string;
};

const SectionTitle = ({ title, description }: SectionTiTleProps) => {
  return (
    <div
      className={
        (poppins.className,
        "text-gr flex flex-col items-center gap-[15px] mb-32")
      }
    >
      <h2 className="font-bold text-5xl">{title}</h2>
      {description && (
        <p className={cn(poppins.className, "text-2xl")}>{description}</p>
      )}
    </div>
  );
};
export default SectionTitle;

import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";
import { poppins } from "@/lib/fonts";
import "./style.scss";
import TypeWritingText from "./TypeWritingText";
import HeroImage from "./HeroImage";

const Hero = ({ settings }: { settings: ISetting }) => {
  return (
    <div
      className={cn(
        poppins.className,
        "container flex flex-col gap-6 relative",
        "min-h-[520px] sm:min-h-[400px] xl:min-h-[600px]"
      )}
      style={{
        height: "calc(100dvh - 6rem)",
      }}
    >
      <article className="flex flex-col items-end justify-center gap-6 sm:flex-row sm:items-center flex-1">
        <TypeWritingText />
        <HeroImage />
      </article>
    </div>
  );
};
export default Hero;

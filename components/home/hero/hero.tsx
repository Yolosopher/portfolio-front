import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";
import Image from "next/image";
import { poppins } from "@/lib/fonts";

const Hero = ({ settings }: { settings: ISetting }) => {
  return (
    <div
      className={cn(
        "container flex flex-col gap-6 relative",
        "min-h-[520px] sm:min-h-[400px] xl:min-h-[600px]"
      )}
      style={{
        height: "calc(100dvh - 6rem)",
      }}
    >
      <article className="flex flex-col items-end justify-center gap-6 sm:flex-row sm:items-center flex-1">
        <h1
          className={cn(
            poppins.className,
            "text-3xl xl:text-[3.625rem] font-bold max-w-[300px] xl:max-w-[500px] leading-10 xl:leading-[4.375rem] self-start sm:self-auto"
          )}
          dangerouslySetInnerHTML={{ __html: settings.intro_text }}
        />
        <div className="flex justify-end items-end w-56 h-56 xl:w-80 xl:h-80 border-primary border-8">
          <Image
            className="object-contain"
            alt="yolosopher-image"
            src="/my-images/5.png"
            width={304}
            height={432}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </article>
    </div>
  );
};
export default Hero;

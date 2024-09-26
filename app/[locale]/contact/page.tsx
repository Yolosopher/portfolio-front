import { fetchSettings } from "@/actions/settings";
import Clipboard from "@/components/shared/clipboard/Clipboard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { dmSans, poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";

const Contact = async () => {
  const settingResult = await fetchSettings();
  const setting = settingResult.data as ISetting;
  return (
    <section
      className={cn(
        dmSans.className,
        "container flex justify-center items-center h-[calc(100dvh-192px)]"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-8 w-full max-w-xl",
          "text-lg sm:text-2xl md:text-3xl lg:text-4xl"
        )}
      >
        <h2
          className={cn(
            poppins.className,
            "self-center font-semibold text-bluish dark:text-gr"
          )}
        >
          Contact:
        </h2>
        <div className="flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                className="font-bold contact-text "
                href={`mailto:${setting.email}`}
                data-umami-event={`Email clicked`}
              >
                {setting.email}
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80">
              <p className="text-sm font-bold">
                click here to start sending the mail{" "}
                <span className="font-normal">or</span> copy with copy button
              </p>
            </HoverCardContent>
          </HoverCard>
          <Clipboard
            className="bg-primary text-primary-foreground"
            onlyIcon
            content={setting.email}
            eventName={`Email copied`}
            iconSize={20}
          />
        </div>
        <div className="flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                className="font-bold contact-text"
                href={`tel:+${setting.phone}`}
                data-umami-event={`Phone clicked`}
              >
                +{setting.phone}
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80">
              <p className="text-sm font-bold">
                click to directly call <span className="font-normal">or</span>{" "}
                copy the number
              </p>
            </HoverCardContent>
          </HoverCard>
          <Clipboard
            className="bg-primary text-primary-foreground"
            onlyIcon
            iconSize={20}
            eventName={`Phone copied`}
            content={setting.phone}
          />
        </div>
      </div>
    </section>
  );
};
export default Contact;

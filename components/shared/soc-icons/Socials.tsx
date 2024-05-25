import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";
import { GrLinkedinOption } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";

const SocialLi = ({
  href,
  children,
  className,
  parentComponentName,
  socLinkName,
}: {
  parentComponentName: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  socLinkName: string;
}) => {
  return (
    <li className="flex w-max h-max justify-center items-center">
      <a
        data-umami-event={`Social link ${socLinkName} clicked in ${parentComponentName}`}
        href={href}
        target="_blank"
        rel="nofollow noreferrer noopener"
        aria-label="Social link"
        className={cn(
          "flex rounded-full overflow-hidden  transition-all  justify-center items-center w-[1.875rem] h-[1.875rem] bg-gr text-gr-foreground dark:hover:bg-white dark:bg-gr hover:bg-foreground dark:hover:bg-foreground",
          className ?? ""
        )}
      >
        {children}
      </a>
    </li>
  );
};

const Socials = ({
  settings,
  bluish,
  parentComponentName,
}: {
  parentComponentName: string;
  settings: ISetting;
  bluish?: boolean;
}) => {
  return (
    <ul className="flex items-center gap-4 text-gr font-medium">
      {settings.github && (
        <SocialLi
          socLinkName="Github"
          parentComponentName={parentComponentName}
          href={settings.github}
          className={bluish ? "bg-bluish hover:bg-bluish/90" : ""}
        >
          <PiGithubLogoFill />
        </SocialLi>
      )}
      {settings.facebook && (
        <SocialLi
          socLinkName="Facebook"
          parentComponentName={parentComponentName}
          href={settings.facebook}
          className={bluish ? "bg-bluish hover:bg-bluish/90" : ""}
        >
          <TfiFacebook size={16} />
        </SocialLi>
      )}
      {settings.linkedin && (
        <SocialLi
          socLinkName="Linkedin"
          parentComponentName={parentComponentName}
          href={settings.linkedin}
          className={bluish ? "bg-bluish hover:bg-bluish/90" : ""}
        >
          <GrLinkedinOption size={16} />
        </SocialLi>
      )}
    </ul>
  );
};
export default Socials;

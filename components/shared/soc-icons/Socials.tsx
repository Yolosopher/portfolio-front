import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";
import { GrLinkedinOption } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";

const SocialLi = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <li className="flex w-max h-max justify-center items-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
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
}: {
  settings: ISetting;
  bluish?: boolean;
}) => {
  return (
    <ul className="flex items-center gap-4 text-gr font-medium">
      {settings.github && (
        <SocialLi
          href={settings.github}
          className={bluish ? "bg-bluish hover:bg-bluish/90" : ""}
        >
          <PiGithubLogoFill />
        </SocialLi>
      )}
      {settings.facebook && (
        <SocialLi
          href={settings.facebook}
          className={bluish ? "bg-bluish hover:bg-bluish/90" : ""}
        >
          <TfiFacebook size={16} />
        </SocialLi>
      )}
      {settings.linkedin && (
        <SocialLi
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

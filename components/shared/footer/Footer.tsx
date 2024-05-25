import { Separator } from "@/components/ui/separator";
import { ISetting } from "@/models/setting";
import Image from "next/image";
import Link from "next/link";
import Socials from "../soc-icons/Socials";
import Nav from "../header/Nav";

const Footer = ({ settings }: { settings: ISetting }) => {
  return (
    <>
      <footer className="bg-background py-2">
        <div className="container flex flex-col gap-6 xl:gap-10">
          {/* top */}
          <div className="flex flex-col text-center xl:text-left items-center gap-6 xl:gap-2 xl:justify-between xl:flex-row">
            <Link href="/">
              <Image
                src="/logo_grey.png"
                alt="Logo"
                className="h-12 xl:h-[60px] object-contain w-max hidden dark:block"
                width={246}
                height={60}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <Image
                src="/logo.png"
                alt="Logo"
                className="h-12 xl:h-[60px] object-contain w-max dark:hidden"
                width={246}
                height={60}
                priority
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </Link>
            <div className="flex flex-col gap-3 xl:gap-12 text-bluish xl:items-center xl:flex-row">
              <a className="dark:text-gr" href={`tel:+${settings.phone}`}>
                +{settings.phone}
              </a>
              <a className="dark:text-gr" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
              <div className="flex justify-center">
                <Socials
                  parentComponentName="Footer"
                  settings={settings}
                  bluish
                />
              </div>
            </div>
          </div>
          {/* separator */}
          <Separator />
          {/* bottom */}
          <div className="flex items-center gap-2 justify-center xl:justify-between">
            <div className="hidden xl:flex text-lg font-normal">
              <Nav bluish />
            </div>
            <div className="text-center xl:text-right text-lg font-medium">
              Copyright © 2024{" "}
              <span className="block sm:inline text-bluish dark:text-primary font-bold">
                Yolosopher.
              </span>{" "}
              All rights reserved.
            </div>
          </div>
          {/* space */}
          <div className="h-4 sm:h-8 xl:h-4"></div>
        </div>
      </footer>
    </>
  );
};
export default Footer;

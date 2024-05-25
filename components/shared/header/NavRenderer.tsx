"use client";
import useMediaQuery from "@/hooks/media-query/useMediaQuery";
import Nav from "./Nav";
import { PiHamburgerBold } from "react-icons/pi";
import Socials from "../soc-icons/Socials";
import { ISetting } from "@/models/setting";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

const NavRenderer = ({ settings }: { settings: ISetting }) => {
  const isMoreThan1240 = useMediaQuery(1240);
  return (
    <>
      {isMoreThan1240 ? (
        <>
          <Nav />
          <Socials parentComponentName="Header" settings={settings} />
        </>
      ) : (
        <MobileMenu
          settings={settings}
          trigger={
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Open the menu"
            >
              <PiHamburgerBold className="text-[1.5rem] " />
            </Button>
          }
        />
      )}
    </>
  );
};
export default NavRenderer;

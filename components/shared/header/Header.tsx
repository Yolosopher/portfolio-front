import Image from "next/image";
import { PiHamburgerBold } from "react-icons/pi";
import Nav from "./Nav";
import { ModeToggle } from "@/components/mode-toggle";
import { ISetting } from "@/models/setting";
import Socials from "../soc-icons/Socials";
import Link from "next/link";
import NavRenderer from "./NavRenderer";

const Header = ({ settings }: { settings: ISetting }) => {
  return (
    <header className="h-16 p-0.5 fixed top-10 left-0 w-full bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-12 xl:h-[60px] object-contain w-max"
            width={246}
            height={60}
          />
        </Link>
        <div className="flex gap-2 xl:gap-[3.125rem]  items-center">
          <NavRenderer settings={settings} />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;

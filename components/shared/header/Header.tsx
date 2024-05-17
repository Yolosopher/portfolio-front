import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ISetting } from "@/models/setting";
import Link from "next/link";
import NavRenderer from "./NavRenderer";

const Header = ({ settings }: { settings: ISetting }) => {
  return (
    <header className="h-36 py-10 fixed top-0 left-0 w-full bg-background">
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
        <div className="flex gap-2 xl:gap-[3.125rem]  items-center text-xl font-medium">
          <NavRenderer settings={settings} />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;

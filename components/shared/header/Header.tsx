import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { ISetting } from "@/models/setting";
import Link from "next/link";
import NavRenderer from "./NavRenderer";

const Header = ({ settings }: { settings: ISetting }) => {
  return (
    <header className="h-24 flex items-center fixed z-10 top-0 left-0 w-full bg-background shadow-primary/10 shadow-xl">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex w-[200px] sm:w-[246px] aspect-[246/60]">
          <Image
            src="/logo.png"
            priority
            alt="Logo"
            className="object-contain w-max h-max"
            width={246}
            height={60}
            style={{ width: "auto", height: "auto" }}
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

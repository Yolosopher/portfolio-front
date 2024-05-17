import navList from "@/config/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavLi = ({
  name,
  path,
  cb,
}: {
  name: string;
  path: string;
  cb?: () => void;
}) => {
  return (
    <li className="text-xl capitalize">
      <Link
        {...(cb ? { onClick: cb } : {})}
        className="transition-all dark:hover:text-white  hover:text-black"
        href={path}
      >
        {name}
      </Link>
    </li>
  );
};

const Nav = ({ vertical, cb }: { vertical?: boolean; cb?: () => void }) => {
  return (
    <nav>
      <ul
        className={cn(
          "flex",
          vertical ? "flex-col gap-2" : "items-center gap-[3.125rem]"
        )}
      >
        {navList.map((nav, index) => (
          <NavLi key={index} {...nav} cb={cb} />
        ))}
      </ul>
    </nav>
  );
};
export default Nav;

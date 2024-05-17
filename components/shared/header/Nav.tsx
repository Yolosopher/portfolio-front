import navList from "@/config/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavLi = ({
  name,
  path,
  cb,
  className,
}: {
  name: string;
  path: string;
  cb?: () => void;
  className?: string;
}) => {
  return (
    <li className="capitalize">
      <Link
        {...(cb ? { onClick: cb } : {})}
        className={cn(
          "transition-all dark:hover:text-white  hover:text-black",
          className ?? ""
        )}
        href={path}
      >
        {name}
      </Link>
    </li>
  );
};

const Nav = ({
  vertical,
  cb,
  bluish,
}: {
  vertical?: boolean;
  cb?: () => void;
  bluish?: boolean;
}) => {
  return (
    <nav>
      <ul
        className={cn(
          "flex",
          vertical ? "flex-col gap-2" : "items-center gap-[3.125rem]"
        )}
      >
        {navList.map((nav, index) => (
          <NavLi
            key={index}
            {...nav}
            cb={cb}
            className={bluish ? "text-bluish dark:text-gr" : "text-gr"}
          />
        ))}
      </ul>
    </nav>
  );
};
export default Nav;

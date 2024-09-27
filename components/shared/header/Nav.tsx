import navList from "@/config/nav";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { useServerT } from "@/actions/helperTranslation";

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
    const { t } = useServerT();
    return (
        <li className="capitalize text-[18px]">
            <Link
                {...(cb ? { onClick: cb } : {})}
                className={cn(
                    "transition-all dark:hover:text-white  hover:text-black",
                    className ?? ""
                )}
                href={path}
            >
                {t(name)}
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
                    vertical ? "flex-col gap-2" : "items-center gap-3"
                )}
            >
                {navList.map((nav, index) => (
                    <NavLi
                        key={index}
                        {...nav}
                        cb={cb}
                        className={
                            bluish ? "text-bluish dark:text-gr" : "text-gr"
                        }
                    />
                ))}
            </ul>
        </nav>
    );
};
export default Nav;

"use client";
import navListAdmin from "@/config/adminNav";
import { Link } from "@/i18n/routing";
import CheckToken from "./CheckToken";

const NavLi = ({ name, path }: { name: string; path: string }) => {
    return (
        <li>
            <Link href={path}>{name}</Link>
        </li>
    );
};

const AdminNav = () => {
    return (
        <>
            <CheckToken />
            <nav className="flex w-1 md:w-full flex-1">
                <ul className="flex gap-4 md:justify-center whitespace-nowrap capitalize w-full overflow-x-auto py-1">
                    {navListAdmin.map((nav, index) => (
                        <NavLi {...nav} key={index} />
                    ))}
                </ul>
            </nav>
        </>
    );
};
export default AdminNav;

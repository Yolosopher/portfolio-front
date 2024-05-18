import navListAdmin from "@/config/adminNav";
import Link from "next/link";

const NavLi = ({ name, path }: { name: string; path: string }) => {
  return (
    <li className="capitalize">
      <Link href={path}>{name}</Link>
    </li>
  );
};

const AdminNav = () => {
  return (
    <nav>
      <ul className="flex gap-4 justify-center">
        {navListAdmin.map((nav, index) => (
          <NavLi {...nav} key={index} />
        ))}
      </ul>
    </nav>
  );
};
export default AdminNav;

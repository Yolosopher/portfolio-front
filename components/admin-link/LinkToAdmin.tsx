"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

const LinkToAdmin = () => {
  const pathname = usePathname();

  return pathname.includes("/admin") ? null : (
    <Button asChild size={"icon"}>
      <Link
        href={"/admin"}
        rel="nofollow"
        className="fixed z-10 bottom-3 right-2"
      >
        <Shield />
      </Link>
    </Button>
  );
};
export default LinkToAdmin;

"use client";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

const LinkToAdmin = () => {
    const pathname = usePathname();

    return pathname.includes("/admin") ? null : (
        <Button asChild size={"icon"}>
            <Link
                aria-label="Admin panel"
                href={"/admin"}
                rel="nofollow"
                className="fixed z-10 bottom-3 right-3"
            >
                <Shield />
            </Link>
        </Button>
    );
};
export default LinkToAdmin;

"use client";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import USA from "./flags/USA";
import Georgia from "./flags/Georgia";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
    const pathname = usePathname();
    const locale = useLocale();
    return (
        <div className="flex items-center gap-1">
            <Link
                className={locale === "en" ? "opacity-100" : "opacity-30"}
                href={pathname}
                locale="en"
            >
                <USA />
            </Link>
            <Link
                className={locale === "ka" ? "opacity-100" : "opacity-30"}
                href={pathname}
                locale="ka"
            >
                <Georgia />
            </Link>
        </div>
    );
};

export default LanguageSwitcher;

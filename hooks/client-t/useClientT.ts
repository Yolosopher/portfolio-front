"use client";

import { getLocaleKey } from "@/lib/useT";
import { Locales } from "@/types";
import { useLocale, useTranslations } from "next-intl";

const useClientT = () => {
    const locale = useLocale() as Locales;
    const translations = useTranslations("data");
    return {
        t: (key: string) => translations(getLocaleKey(key, locale)),
    };
};

export default useClientT;

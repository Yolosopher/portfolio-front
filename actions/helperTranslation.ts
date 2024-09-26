import { getLocaleKey } from "@/lib/useT";
import { Locales } from "@/types";
import { useLocale, useTranslations } from "next-intl";

export const useServerT = () => {
    const translations = useTranslations("data");
    const locale = useLocale() as Locales;
    const t = (key: string) => translations(getLocaleKey(key, locale));

    return { t };
};

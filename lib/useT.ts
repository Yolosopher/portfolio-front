import { Locales } from "@/types";

export const getLocaleKey = (key: string, locale: Locales) => {
    return `${key}.${locale}`;
};

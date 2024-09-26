import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { fetchTranslations } from "@/actions/translations";

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as any)) notFound();

    const translations = await fetchTranslations();

    return {
        messages: {
            data: translations.data,
            version: translations.version,
        },
    };
});

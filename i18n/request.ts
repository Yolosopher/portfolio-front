import { fetchTranslations } from "@/actions/translations";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  const translations = await fetchTranslations();

  return {
    messages: {
      data: translations.data,
      version: translations.version,
    },
  };
});

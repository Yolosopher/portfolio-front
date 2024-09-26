import TranslationTable from "@/components/admin/translation/TranslationTable";
import { getLocaleKey } from "@/lib/useT";
import { ITranslation } from "@/models/translation";
import { Locales } from "@/types";
import { Loader } from "lucide-react";
import { getMessages, getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

const AdminTranslationsPage = async ({
    params: { locale },
}: {
    params: { locale: Locales };
}) => {
    const translationsData = (await getMessages())! as unknown as ITranslation;

    const translations = await getTranslations("data");
    const t = (key: string) => translations(getLocaleKey(key, locale));

    const refetchTranslations = async () => {
        "use server";
        revalidateTag("translation");
    };
    return (
        <div className="container flex flex-col gap-3">
            <div className="relative mt-6 flex md:justify-center items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold md:text-center text-left">
                    {t("ADMIN")} | {t("TRANSLATIONS")}
                </h1>
            </div>
            <div className="flex flex-col justify-center items-start">
                {!translationsData ? (
                    <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background">
                        <Loader
                            size={16}
                            className="animate animate-spin w-max h-max"
                        />
                    </div>
                ) : (
                    <TranslationTable
                        t={t}
                        refetch={refetchTranslations}
                        translations={translationsData.data}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminTranslationsPage;

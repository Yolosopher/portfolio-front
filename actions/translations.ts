"use server";
import CONFIG from "@/config";

export const fetchTranslations = async () => {
    const res = await fetch(`${CONFIG.backend_url}/translation`, {
        next: {
            revalidate: 60,
            tags: ["translation"],
        },
    });
    const json = await res.json();

    return json;
};

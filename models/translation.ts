export type TranslationPayload = {
    en: string;
    ka: string;
};

export interface ITranslation {
    data: Record<string, TranslationPayload>;
    version: string;
}

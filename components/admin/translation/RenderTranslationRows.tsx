"use client";
import { ITranslation } from "@/models/translation";
import TranslationRow from "./TranslationRow";

type RenderTranslationRowsProps = {
    translations: ITranslation["data"];
    refetch: () => void | Promise<void>;
};

const RenderTranslationRows = ({
    translations,
    refetch,
}: RenderTranslationRowsProps) => {
    return (
        <>
            {Object.entries(translations).map(([key, { en, ka }], index) => (
                <TranslationRow
                    key={index}
                    en={en}
                    ka={ka}
                    keyString={key}
                    refetch={refetch}
                />
            ))}
        </>
    );
};

export default RenderTranslationRows;

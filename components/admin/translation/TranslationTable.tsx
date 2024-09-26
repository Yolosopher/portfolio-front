import { ITranslation } from "@/models/translation";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import NewTranslation from "./NewTranslation";
import RenderTranslationRows from "./RenderTranslationRows";

type TranslationTableProps = {
    translations: ITranslation["data"];
    refetch: () => void | Promise<void>;
    t: (key: string) => string;
};

const TranslationTable = ({
    t,
    translations,
    refetch,
}: TranslationTableProps) => {
    return (
        <Table className="w-max mx-auto">
            <TableCaption>{t("LIST_OF_TRANSLATIONS")}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="uppercase">{t("KEYWORD")}</TableHead>
                    <TableHead className="uppercase">{t("EN")}</TableHead>
                    <TableHead className="uppercase">{t("KA")}</TableHead>
                    <TableHead className="text-right">{t("ACTIONS")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <RenderTranslationRows
                    translations={translations}
                    refetch={refetch}
                />
                <NewTranslation refetch={refetch} />
            </TableBody>
        </Table>
    );
};

export default TranslationTable;

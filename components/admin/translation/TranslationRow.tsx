/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import useClientT from "@/hooks/client-t/useClientT";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import randomUID from "@/lib/randomUID";
import { getLocaleKey } from "@/lib/useT";
import { Locales } from "@/types";
import { Pen, PenLine, Trash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type TranslationRowProps = {
    en: string;
    ka: string;
    keyString: string;
    refetch: () => void | Promise<void>;
};

const TranslationRow = ({
    en,
    ka,
    keyString,
    refetch,
}: TranslationRowProps) => {
    const { t } = useClientT();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();

    const [loading, setLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const formId = randomUID();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!enValue && !kaValue) {
                throw new Error("At least one translation is required");
            }
            setLoading(true);
            const payload: {
                key: string;
                values: {
                    en?: string;
                    ka?: string;
                };
            } = {
                key: keyString,
                values: {},
            };
            if (enValue) {
                payload.values.en = enValue;
            }
            if (kaValue) {
                payload.values.ka = kaValue;
            }
            const result = await request({
                url: `/translation`,
                method: "PUT",
                body: payload,
                auth: true,
            });

            if (result) {
                if (!result.success) {
                    errorHandler(result.error);
                } else {
                    toast({
                        title: "Success",
                        description:
                            result.data.message ??
                            "Success true for translation",
                    });
                    setEditMode(false);
                    refetch();
                }
            }
        } catch (error: any) {
            errorHandler(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const result = await request({
                url: `/translation?key=${keyString}`,
                method: "DELETE",
                auth: true,
            });

            if (result) {
                if (!result.success) {
                    errorHandler(result.error);
                } else {
                    toast({
                        title: "Success",
                        description:
                            result.data.message ??
                            "Success true for translation",
                    });
                    setEditMode(false);
                    refetch();
                }
            }
        } catch (error: any) {
            errorHandler(error.message);
        } finally {
            setLoading(false);
        }
    };

    const [kaValue, setKaValue] = useState<string>(ka);
    const [enValue, setEnValue] = useState<string>(en);

    const refOfInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (refOfInput?.current && editMode) {
            refOfInput.current?.focus();
        }
    }, [refOfInput?.current, editMode]);
    return (
        <TableRow className={editMode ? "!bg-muted" : "!bg-transparent"}>
            <TableCell>
                <div>
                    <Input
                        type="text"
                        className="pointer-events-none"
                        value={keyString}
                        readOnly
                        form={formId}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <Input
                        type="text"
                        value={enValue}
                        onChange={(e) => setEnValue(e.target.value)}
                        form={formId}
                        ref={refOfInput}
                        readOnly={!editMode}
                        disabled={loading || !editMode}
                        className={editMode ? "" : "pointer-events-none"}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <Input
                        type="text"
                        value={kaValue}
                        onChange={(e) => setKaValue(e.target.value)}
                        form={formId}
                        readOnly={!editMode}
                        disabled={loading || !editMode}
                        className={editMode ? "" : "pointer-events-none"}
                    />
                </div>
            </TableCell>
            <TableCell className="text-right">
                <form
                    id={formId}
                    onSubmit={handleSubmit}
                    className="flex items-center gap-1"
                >
                    <Button
                        variant={"doubt"}
                        type="button"
                        className="flex items-center gap-2 text-sm"
                        disabled={loading}
                        onClick={() => setEditMode((prevstate) => !prevstate)}
                    >
                        {editMode ? (
                            <span>{t("EDITING")}</span>
                        ) : (
                            <span>{t("EDIT")}</span>
                        )}
                    </Button>
                    <Button
                        className="text-sm"
                        type="submit"
                        disabled={loading || !editMode}
                    >
                        {loading ? t("UPDATING") : t("UPDATE")}
                    </Button>
                    <Button
                        variant={"destructive"}
                        type="button"
                        size={"icon"}
                        className="flex items-center gap-2 text-sm"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        <Trash />
                    </Button>
                </form>
            </TableCell>
        </TableRow>
    );
};

export default TranslationRow;

"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { toast } from "@/components/ui/use-toast";
import { TranslationPayload } from "@/models/translation";
import useClientT from "@/hooks/client-t/useClientT";

type NewTranslationProps = {
    refetch: () => void | Promise<void>;
};

const NewTranslation = ({ refetch }: NewTranslationProps) => {
    const { t } = useClientT();
    const request = useApiRequest();
    const errorHandler = useErrorHandler();
    const [loading, setLoading] = useState<boolean>(false);
    const [key, setKey] = useState<string>("");
    const [enValue, setEnValue] = useState<string>("");
    const [kaValue, setKaValue] = useState<string>("");

    const formId = "new-translation-form";

    const cleanup = () => {
        setKey("");
        setEnValue("");
        setKaValue("");
    };
    const keywordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!key) {
                throw new Error("Key is required");
            }

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
                key,
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
                    refetch();
                    cleanup();
                    keywordRef.current?.focus();
                }
            }
        } catch (error: any) {
            errorHandler(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TableRow className={"!bg-transparent focus-within:!bg-muted"}>
            <TableCell>
                <div>
                    <Input
                        type="text"
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value.toUpperCase());
                        }}
                        form={formId}
                        disabled={loading}
                        placeholder="Type key..."
                        ref={keywordRef}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <Input
                        type="text"
                        value={enValue}
                        disabled={loading}
                        onChange={(e) => {
                            setEnValue(e.target.value);
                        }}
                        form={formId}
                        placeholder="Type English value..."
                    />
                </div>
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    value={kaValue}
                    form={formId}
                    disabled={loading}
                    onChange={(e) => {
                        setKaValue(e.target.value);
                    }}
                    placeholder="Type Georgian value..."
                />
            </TableCell>
            <TableCell>
                <form id={formId} onSubmit={handleSubmit}>
                    <Button
                        disabled={loading}
                        size={"lg"}
                        className="w-full"
                        type="submit"
                    >
                        {loading ? "Adding..." : t("ADD")}
                    </Button>
                </form>
            </TableCell>
        </TableRow>
    );
};

export default NewTranslation;

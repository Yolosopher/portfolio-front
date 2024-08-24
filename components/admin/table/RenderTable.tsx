import RenderImage from "@/components/shared/image/RenderImage";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PenLine, Trash } from "lucide-react";
import { useMemo } from "react";
import { Confirm } from "../confirm/Confirm";
import { cn } from "@/lib/utils";
import Clipboard from "@/components/shared/clipboard/Clipboard";
import { format } from "date-fns";

type ActionType = "edit" | "delete";

interface RenderTableProps<T> {
    heads: {
        label: string | JSX.Element;
        value: string;
    }[];
    actions?: Map<ActionType, (id: string) => void | Promise<void>>;
    rows: T[];
    imageKeys?: string | string[];
    links?: string[];
    name?: string;
    dateKeys?: string | string[];
}

const RenderTable = <T,>({
    imageKeys,
    dateKeys,
    links,
    actions,
    heads,
    rows,
    name,
}: RenderTableProps<T>) => {
    const memoidActions = useMemo(
        () => (actions && actions.size > 0 ? [...actions] : null),
        [actions]
    );
    return (
        <Table>
            <TableCaption>{`A list of your ${name ?? "data"}`}</TableCaption>
            <TableHeader>
                <TableRow>
                    {heads.map(({ label }, index) => (
                        <TableHead
                            className={
                                index === 0
                                    ? "w-[6.25rem]"
                                    : !memoidActions &&
                                      index === heads.length - 1
                                    ? "text-right"
                                    : ""
                            }
                            key={index}
                        >
                            {label}
                        </TableHead>
                    ))}
                    {/* action cell */}
                    {memoidActions && (
                        <TableHead className="text-right">Actions</TableHead>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {heads.map(({ value }, i) => {
                            const val = (row as any)[value];
                            const description = (row as any)["description"];
                            const invertOnDark =
                                description && description.includes("invert");
                            let content: any = null;

                            if (value === "stack") {
                                content = val
                                    .split(", ")
                                    .map((v: string, i: number) => (
                                        <span key={i} className="block text-xs">
                                            {v}
                                        </span>
                                    ));
                            } else if (value === "_id") {
                                content = (
                                    <Clipboard
                                        content={val}
                                        maxLength={7}
                                        iconSize={16}
                                    />
                                );
                            } else if (value === "description") {
                                content = (
                                    <div
                                        title={val}
                                        className="text-xs line-clamp-5 max-w-xs"
                                    >
                                        {val}
                                    </div>
                                );
                            } else if (value === "github") {
                                if (val.includes(", ")) {
                                    content = val
                                        .split(", ")
                                        .map((v: string, i: number) => (
                                            <a
                                                key={i}
                                                title={v}
                                                href={v}
                                                target="_blank"
                                                className="block"
                                            >
                                                {v.length > 20
                                                    ? v.length > 35
                                                        ? `${v.slice(
                                                              19,
                                                              -10
                                                          )}...`
                                                        : `${v.slice(19)}`
                                                    : v}
                                            </a>
                                        ));
                                } else {
                                    content = (
                                        <a
                                            title={val}
                                            href={val}
                                            target="_blank"
                                        >
                                            {val.length > 20
                                                ? val.length > 35
                                                    ? `${val.slice(19, -10)}...`
                                                    : `${val.slice(19)}`
                                                : val}
                                        </a>
                                    );
                                }
                            } else if (dateKeys && dateKeys.includes(value)) {
                                content = (
                                    <span>
                                        {val
                                            ? format(new Date(val), "yyyy MMM")
                                            : "Present"}
                                    </span>
                                );
                            } else if (imageKeys && imageKeys.includes(value)) {
                                content = val ? (
                                    <RenderImage
                                        name={val}
                                        width={80}
                                        height={80}
                                        viewer
                                        invertOnDark={invertOnDark}
                                        className={cn(
                                            "w-20 h-20 min-w-20 min-h-20 object-contain flex-shrink-0"
                                        )}
                                    />
                                ) : (
                                    "No Image"
                                );
                            } else if (links && links.includes(value)) {
                                content = (
                                    <a title={val} href={val} target="_blank">
                                        {val.length > 20
                                            ? `${val.slice(0, 20)}...`
                                            : val}
                                    </a>
                                );
                            } else {
                                content = val;
                            }
                            return (
                                <TableCell
                                    className={
                                        i === 0
                                            ? "font-medium"
                                            : !memoidActions &&
                                              i === heads.length - 1
                                            ? "text-right"
                                            : ""
                                    }
                                    key={i}
                                >
                                    {content}
                                </TableCell>
                            );
                        })}
                        {/* action cell */}
                        {memoidActions && (
                            <TableCell>
                                <div className="flex gap-2 items-center justify-end w-full">
                                    {memoidActions.map(([key, action], i) =>
                                        key === "delete" ? (
                                            <Confirm
                                                key={i}
                                                trigger={
                                                    <Button
                                                        size={"icon"}
                                                        variant={"destructive"}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                }
                                                action={() =>
                                                    action((row as any)._id)
                                                }
                                                title="Are sure you want to delete this item?"
                                                description="This action cannot be undone."
                                            />
                                        ) : (
                                            <Button
                                                size={"icon"}
                                                key={i}
                                                onClick={() =>
                                                    action((row as any)._id)
                                                }
                                            >
                                                <PenLine />
                                            </Button>
                                        )
                                    )}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default RenderTable;

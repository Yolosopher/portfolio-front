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

type ActionType = "edit" | "delete";

interface RenderTableProps<T> {
  heads: {
    label: string;
    value: string;
  }[];
  actions?: Map<ActionType, (id: string) => void | Promise<void>>;
  rows: T[];
  imageKey?: string;
  name?: string;
}

const RenderTable = <T,>({
  imageKey,
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
                  : !memoidActions && index === heads.length - 1
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
              const content =
                imageKey && value === imageKey ? (
                  <RenderImage
                    name={val}
                    width={80}
                    height={80}
                    className={cn(
                      "w-20 h-20",
                      invertOnDark ? "dark:filter dark:invert" : ""
                    )}
                  />
                ) : (
                  val
                );
              return (
                <TableCell
                  className={
                    i === 0
                      ? "font-medium"
                      : !memoidActions && i === heads.length - 1
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
                          <Button size={"icon"} variant={"destructive"}>
                            <Trash />
                          </Button>
                        }
                        action={() => action((row as any)._id)}
                        title="Are sure you want to delete this item?"
                        description="This action cannot be undone."
                      />
                    ) : (
                      <Button
                        size={"icon"}
                        key={i}
                        onClick={() => action((row as any)._id)}
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

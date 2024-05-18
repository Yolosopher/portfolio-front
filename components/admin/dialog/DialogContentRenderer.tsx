import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogContentRendererProps = {
  title?: string;
  description?: string;
  content: React.ReactNode;
  centeredHeader?: boolean;
};

const DialogContentRenderer = ({
  description,
  title,
  content,
  centeredHeader,
}: DialogContentRendererProps) => {
  return (
    <>
      {(title || description) && (
        <DialogHeader>
          {title && (
            <DialogTitle className={centeredHeader ? "text-center" : ""}>
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className={centeredHeader ? "text-center" : ""}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
      )}
      <div className="grid gap-4 py-4">{content}</div>
    </>
  );
};
export default DialogContentRenderer;

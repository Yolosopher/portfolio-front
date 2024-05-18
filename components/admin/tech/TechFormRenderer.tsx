"use client";

import { useState } from "react";
import { DialogRenderer } from "../dialog/DialogRenderer";
import { Button } from "@/components/ui/button";
import DialogContentRenderer from "../dialog/DialogContentRenderer";
import TechForm from "./TechForm";

const TechFormRenderer = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DialogRenderer
      open={open}
      setOpen={setOpen}
      scroll
      trigger={<Button className="w-full">Add Tech</Button>}
      content={
        <DialogContentRenderer
          title="Add Tech"
          description="Add a new tech to the tech stack."
          content={<TechForm closeDialog={() => setOpen(false)} />}
        />
      }
    />
  );
};
export default TechFormRenderer;

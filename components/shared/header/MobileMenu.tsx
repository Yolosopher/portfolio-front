"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import Nav from "./Nav";
import Socials from "../soc-icons/Socials";
import { ISetting } from "@/models/setting";

export function MobileMenu({
  trigger,
  settings,
}: {
  trigger: React.ReactNode;
  settings: ISetting;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-52">
        <div className="mb-8"></div>
        <div className="grid gap-8 py-4">
          <Nav vertical cb={closeMenu} />
          <Socials settings={settings} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

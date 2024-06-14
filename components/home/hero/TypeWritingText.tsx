"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const NAME_CURSOR_CLSN = "name-cursor-cls";
const FIRST_CURSOR_CLSN = "first-cursor-cls";
const LAST_CURSOR_CLSN = "last-cursor-cls";
const TypeWritingText = () => {
  const hideCursor = (of: "name" | "first" | "last") => {
    const cursorEl = document.querySelector(`.${of}-cursor-cls`);

    if (!cursorEl) {
      return;
    }
    cursorEl.classList.add("hidden-cursor");
  };

  const showCursor = (of: "name" | "first" | "last") => {
    const cursorEl = document.querySelector(`.${of}-cursor-cls`);

    if (!cursorEl) {
      return;
    }
    cursorEl.classList.remove("hidden-cursor");
  };

  return (
    <h1
      className={cn(
        "text-3xl xl:text-[3.625rem] font-bold max-w-[300px] xl:max-w-[500px] leading-10 xl:leading-[4.375rem] self-start sm:self-auto relative",
        "sm:flex-1",
        "min-h-[10rem] xl:min-h-[21.875rem]"
      )}
    >
      <TypeAnimation
        style={{ whiteSpace: "pre-wrap" }}
        sequence={[
          () => showCursor("first"),
          `Hi 👋, My name is `,
          () => hideCursor("first"),
        ]}
        wrapper="span"
        repeat={0}
        className={`${FIRST_CURSOR_CLSN} hidden-cursor`}
      />
      <span className="text-primary">
        <TypeAnimation
          sequence={[
            1300,
            () => showCursor("name"),
            `Nika Nishnianidze.`,
            () => hideCursor("name"),
          ]}
          wrapper="span"
          repeat={0}
          className={`${NAME_CURSOR_CLSN} hidden-cursor`}
        />
      </span>
      <TypeAnimation
        style={{ whiteSpace: "pre-wrap" }}
        sequence={[
          2300,
          () => showCursor("last"),
          ` I build things for web`,
          4000,
          () => hideCursor("last"),
        ]}
        wrapper="span"
        repeat={0}
        className={`${LAST_CURSOR_CLSN} hidden-cursor`}
      />
    </h1>
  );
};

export default TypeWritingText;

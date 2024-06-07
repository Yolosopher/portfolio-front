"use client";
import { cn } from "@/lib/utils";
import { ISetting } from "@/models/setting";
import Image from "next/image";
import { poppins } from "@/lib/fonts";
import "./style.scss";
import useMouseCoords from "@/hooks/mouse-coords/useMouseCoords";
import { useEffect, useRef, useState } from "react";

type MousePotitionToRef = {
  horizontal: -1 | 1 | 0;
  vertical: -1 | 1 | 0;
};

const Hero = ({ settings }: { settings: ISetting }) => {
  const coords = useMouseCoords(2);
  const [mousePositionToRef, setMousePositionToRef] =
    useState<MousePotitionToRef>({
      horizontal: 0,
      vertical: 0,
    });

  useEffect(() => {
    const refElement = document.getElementById("hero-image-box");
    if (refElement) {
      const box = refElement.getBoundingClientRect();

      let verticalValue: MousePotitionToRef["vertical"] = 0;
      if (coords.y < box.top) {
        verticalValue = -1;
      } else if (coords.y > box.top && coords.y < box.bottom) {
        verticalValue = 0;
      } else {
        verticalValue = 1;
      }

      let horizontalValue: MousePotitionToRef["horizontal"] = 0;
      if (coords.x < box.left) {
        horizontalValue = -1;
      } else if (coords.x > box.left && coords.x < box.right) {
        horizontalValue = 0;
      } else {
        horizontalValue = 1;
      }

      setMousePositionToRef({
        horizontal: horizontalValue,
        vertical: verticalValue,
      });
    }
  }, [coords.x, coords.y]);

  return (
    <div
      className={cn(
        "container flex flex-col gap-6 relative",
        "min-h-[520px] sm:min-h-[400px] xl:min-h-[600px]"
      )}
      style={{
        height: "calc(100dvh - 6rem)",
      }}
    >
      <article className="flex flex-col items-end justify-center gap-6 sm:flex-row sm:items-center flex-1">
        <h1
          className={cn(
            poppins.className,
            "text-3xl xl:text-[3.625rem] font-bold max-w-[300px] xl:max-w-[500px] leading-10 xl:leading-[4.375rem] self-start sm:self-auto"
          )}
          dangerouslySetInnerHTML={{ __html: settings.intro_text }}
        />
        <div
          id="hero-image-box"
          className={cn(
            "flex justify-end items-end w-56 h-56 xl:w-80 xl:h-80 border-primary hero-image-box relative",
            // "shadow-2xl shadow-primary",
            `hero-image-box-horizontal-${
              mousePositionToRef.horizontal === 0
                ? "middle"
                : mousePositionToRef.horizontal === 1
                ? "right"
                : "left"
            }`,
            `hero-image-box-vertical-${
              mousePositionToRef.vertical === 0
                ? "middle"
                : mousePositionToRef.vertical === 1
                ? "bottom"
                : "top"
            }`
          )}
        >
          <Image
            className="object-contain"
            alt="yolosopher-image"
            src="/my-images/5.png"
            width={304}
            height={432}
            priority
            style={{
              width: "auto",
              height: "auto",
              right: 8,
              bottom: 8,
            }}
          />
        </div>
      </article>
    </div>
  );
};
export default Hero;

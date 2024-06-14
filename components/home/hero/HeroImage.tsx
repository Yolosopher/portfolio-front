"use client";

import useMouseCoords from "@/hooks/mouse-coords/useMouseCoords";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type MousePotitionToRef = {
  horizontal: -1 | 1 | 0;
  vertical: -1 | 1 | 0;
};

const HeroImage = () => {
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
  );
};

export default HeroImage;

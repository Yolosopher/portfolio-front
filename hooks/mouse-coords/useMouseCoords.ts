"use client";

import { useEffect, useState } from "react";
import useHasMouse from "../has-mouse/useHasMouse";
import useDebounce from "../debounce/useDebounce";

type MouseCoords = { x: number; y: number };

const useMouseCoords = (delay: number = 0) => {
  const hasMouse = useHasMouse();
  const [coords, setCoords] = useState<MouseCoords>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!hasMouse) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      setCoords({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasMouse]);

  const debouncedValue = useDebounce<MouseCoords>(coords, delay);

  return debouncedValue;
};

export default useMouseCoords;

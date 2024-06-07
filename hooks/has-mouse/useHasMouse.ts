"use client";

import { useEffect, useState } from "react";

const useHasMouse = () => {
  const [hasMouse, setHasMouse] = useState<boolean>(true);

  useEffect(() => {
    setHasMouse(window.matchMedia("(pointer:fine)").matches);
  }, []);
  useEffect(() => {
    const matchQueryList = window.matchMedia("(pointer:fine)");
    function handleChange(e: MediaQueryListEvent) {
      setHasMouse(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return hasMouse;
};

export default useHasMouse;

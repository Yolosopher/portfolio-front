"use client";

import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

type ShowLevelProps = {
  level: number;
  max: number;
};

const ShowLevel = ({ level, max }: ShowLevelProps) => {
  const [progress, setProgress] = useState<number>(1);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(level * 10);
    }, 700);

    return () => clearTimeout(timeout);
  }, [level]);
  return (
    <>
      <Progress
        className="bg-primary-foreground border-2 border-primary "
        value={progress}
        data-something={level}
        indicatorClassName="bg-primary"
      />

      <p className="font-bold w-full text-end">
        {level}/{max}
      </p>
    </>
  );
};

export default ShowLevel;

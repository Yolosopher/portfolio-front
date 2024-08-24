"use client";

import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { useInView } from "react-intersection-observer";

type ShowLevelAndNameProps = {
    level: number;
    max: number;
    name: string;
};

const ShowLevelAndName = ({ name, level, max }: ShowLevelAndNameProps) => {
    const [progress, setProgress] = useState<number>(0);
    const [triggerer, setTriggerer] = useState<boolean>(false);

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,

        // triggerOnce: true,
    });

    useEffect(() => {
        setProgress(level);
    }, [level, triggerer]);
    useEffect(() => {
        setTriggerer((prevstate) => !prevstate);
        if (!inView) {
            setProgress(0);
        }
    }, [inView]);

    return (
        <>
            <Progress
                ref={ref}
                className="bg-primary-foreground border-2 border-primary "
                value={progress * 10}
                indicatorClassName="bg-primary transition-translate-x duration-300 ease-[cubic-bezier(0.1, -0.6, 0.2, 0)] delay-700"
            />
            <div className="w-full flex justify-between gap-1">
                <h3 className="text-sm font-bold text-left">{name}</h3>
                <p className="font-bold w-full text-end">
                    {level}/{max}
                </p>
            </div>
        </>
    );
};

export default ShowLevelAndName;

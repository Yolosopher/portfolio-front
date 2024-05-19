"use client";
import { createContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type bottomScrollContextType = {
  fullyScrolled: boolean;
};

const bottomScrollContext = createContext<bottomScrollContextType>({
  fullyScrolled: true,
});

const BottomScrollProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [fullyScrolled, setFullyScrolled] = useState<boolean>(true);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setFullyScrolled(true);
    } else {
      setFullyScrolled(false);
    }
  }, [inView]);

  return (
    <bottomScrollContext.Provider
      value={{
        fullyScrolled,
      }}
    >
      {children}
      <div ref={ref} className="h-0 w-full" />
    </bottomScrollContext.Provider>
  );
};

export { bottomScrollContext, BottomScrollProvider };

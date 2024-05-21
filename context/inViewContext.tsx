"use client";
import { createContext, useState } from "react";

type InViewMapType = Map<string, boolean>;

type inViewContextType = {
  inViewMap: InViewMapType;
  updateViewInfo: (key: string, value: boolean) => void;
};

export const inViewContext = createContext<inViewContextType>({
  inViewMap: new Map<string, boolean>(),
  updateViewInfo: () => {},
});

export const InViewProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [inViewMap, setInViewMap] = useState<InViewMapType>(new Map());

  const updateViewInfo = (key: string, value: boolean) => {
    setInViewMap((prevMap) => prevMap.set(key, value));
  };

  return (
    <inViewContext.Provider
      value={{
        inViewMap,
        updateViewInfo,
      }}
    >
      {children}
    </inViewContext.Provider>
  );
};

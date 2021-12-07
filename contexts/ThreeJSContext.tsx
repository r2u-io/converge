import React, { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface Meta {
  website: string;
}

interface ThreeJSContextData {
  meta?: Meta;
}

export const ThreeJSContext = createContext<ThreeJSContextData>({});

export const ThreeJSProvider: React.FC<Props> = ({ children }: Props) => {
  const [meta] = useState({ website: "https://meta.r2u.io" });

  return (
    <ThreeJSContext.Provider
      value={{
        meta,
      }}
    >
      {children}
    </ThreeJSContext.Provider>
  );
};

"use client";
import { createContext, useContext, useState } from "react";

type LogoDockContextType = {
  isDocked: boolean;
  setIsDocked: (v: boolean) => void;
};

const LogoDockContext = createContext<LogoDockContextType | null>(null);

export function LogoDockProvider({ children }: { children: React.ReactNode }) {
  const [isDocked, setIsDocked] = useState(false);
  return (
    <LogoDockContext.Provider value={{ isDocked, setIsDocked }}>
      {children}
    </LogoDockContext.Provider>
  );
}

export function useLogoDock() {
  const ctx = useContext(LogoDockContext);
  if (!ctx) throw new Error("useLogoDock doit être utilisé dans LogoDockProvider");
  return ctx;
}
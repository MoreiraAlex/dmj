"use client";
import { createContext, useContext, useState } from "react";

const HelpContext = createContext();

export function HelpProvider({ children }) {
  const [content, setContent] = useState(null);

  return <HelpContext.Provider value={{ content, setContent }}>{children}</HelpContext.Provider>;
}

export function useHelp() {
  return useContext(HelpContext);
}

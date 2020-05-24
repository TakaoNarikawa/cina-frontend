import React, { useState } from "react";

type CinaContext = {
  token: string | null;
  setToken: (t: string | null) => void;
};

const defaultContext = {
  token: null,
  setToken: (t: string | null) => {
    /* do nothing */
  },
};
export const CinaContext = React.createContext<CinaContext>(defaultContext);

const Provider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  return <CinaContext.Provider value={{ token, setToken }}>{children}</CinaContext.Provider>;
};

export default Provider;

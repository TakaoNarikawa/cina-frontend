import React, { useState } from "react";

type CinaContext = {
  token: string | null;
  setToken: (t: string | null) => void;
  email: string | null;
  setEmail: (t: string | null) => void;
};

const defaultContext = {
  token: null,
  setToken: (t: string | null) => {
    /* do nothing */
  },
  email: null,
  setEmail: (t: string | null) => {
    /* do nothing */
  },
};
export const CinaContext = React.createContext<CinaContext>(defaultContext);

const Provider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
  console.log(token, email);
  return (
    <CinaContext.Provider
      value={{
        token,
        setToken: (t: string | null) => {
          if (!t) return;
          setToken(t);
          localStorage.setItem("token", t);
        },
        email,
        setEmail: (t: string | null) => {
          if (!t) return;
          setEmail(t);
          localStorage.setItem("email", t);
        },
      }}
    >
      {children}
    </CinaContext.Provider>
  );
};

export default Provider;

import { useState, createContext, useEffect } from "react";
import Redirectuser from "../utils/redirecthome";
import { infoAcc } from "../api/api";

interface Children {
  children: React.ReactNode;
}

interface IProfileContext {
  user: IProfile | null;
  setUser: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

export const AccContext = createContext<IProfileContext | null>(null);

export const AccProvider = ({ children }: Children) => {
  const [user, setUser] = useState<IProfile | null>(null);
  const token = Redirectuser();

  useEffect(() => {
    infoAcc<IProfile>(token)
      .then((res) => {
        setUser(res);
      })
      .catch(() => null);
  }, [token]);

  return (
    <AccContext.Provider value={{ user, setUser }}>
      {children}
    </AccContext.Provider>
  );
};

import { useState, createContext, useEffect } from "react";
import Redirectuser from "../utils/redirecthome";
import { infoAcc } from "../api/api";
import toast from "react-hot-toast";

interface Children {
  children: React.ReactNode;
}

interface IProfileContext {
  user: IProfile | null;
  setUser: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

export const AccContext = createContext<IProfileContext | null>(null);

export const AccProvider = ({ children }: Children) => {
  const token = Redirectuser();

  const [user, setUser] = useState<IProfile | null>(null);

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [token]);

  return (
    <AccContext.Provider value={{ user, setUser }}>
      {children}
    </AccContext.Provider>
  );
};

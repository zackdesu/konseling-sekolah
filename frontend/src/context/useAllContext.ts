import { useContext } from "react";
import { AccContext } from "./accContext";

const useAccContext = () => {
  const context = useContext(AccContext);

  if (!context) {
    throw console.log("Acc context is null.");
  }

  return context;
};

export default useAccContext;

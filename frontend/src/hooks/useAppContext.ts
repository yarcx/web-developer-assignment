import { useContext } from "react";
import { AppContextStore } from "../contexts/AppContext";

const useAppContext = () => {
  return useContext(AppContextStore);
};

export default useAppContext;

import { createContext } from "react";
import type { IAppContextStore } from "../utils/types";
import { initialState } from "../utils/constants";


export const AppContextStore = createContext<IAppContextStore>({
  closeModal: () => {},
  openModal: () => {},
  state: initialState,
});
import { useMemo, useReducer, type FC, type ReactNode } from "react";

import { initialState, STATE_ACTIONS } from "../utils/constants";
import { AppContextStore } from "../contexts/AppContext";
import { reducer } from "../store/reducers";

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeModal = () => {
    dispatch({ type: STATE_ACTIONS.CLOSE_MODAL, payload: {} });
  };

  const openModal = (type: string, data?: unknown) => {
    dispatch({ type, payload: data ? (data as Record<string, unknown>) : {} });
  };

  const values = useMemo(
    () => ({
      state,
      closeModal,
      openModal,
    }),
    [state]
  );
  return <AppContextStore.Provider value={values}>{children}</AppContextStore.Provider>;
};

export default AppContextProvider;

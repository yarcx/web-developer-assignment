import { useMemo, useReducer, type FC, type ReactNode } from "react";
import type { IState } from "../utils/types";
import { initialState, STATE_ACTIONS } from "../utils/constants";
import { AppContextStore } from "../contexts/AppContext";

const reducer = (state: IState, action: { type: string; payload: Record<string, unknown> }) => {
  switch (action.type) {
    case STATE_ACTIONS.ADD_NEW_USER:
      return {
        ...state,
        isModalOpen: true,
        modalType: STATE_ACTIONS.ADD_NEW_USER,
        modalProps: action.payload,
      };
    case STATE_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalType: "",
      };
    default:
      return state;
  }
};
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

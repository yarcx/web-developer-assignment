import { STATE_ACTIONS } from "../utils/constants";
import type { IState } from "../utils/types";

export const reducer = (state: IState, action: { type: string; payload: Record<string, unknown> }) => {
  switch (action.type) {
    case STATE_ACTIONS.ADD_NEW_USER:
      return {
        ...state,
        isModalOpen: true,
        modalType: STATE_ACTIONS.ADD_NEW_USER,
        modalProps: action.payload,
      };
    case STATE_ACTIONS.DELETE_POST:
      return {
        ...state,
        isModalOpen: true,
        modalType: STATE_ACTIONS.DELETE_POST,
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
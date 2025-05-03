// appReducer.ts
import { AppState, AppAction } from "../walletReducer/types";

const initialState: AppState = {
  wallets: [],
};

export const walletReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "SET_WALLETS":
      return {
        ...state,
        wallets: action.wallets,
      };
    default:
      return state;
  }
};

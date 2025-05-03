// appReducer.ts
import { AppState, AppAction } from "./types";

const initialState: AppState = {
  headerTitle: null,
};

export const appReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "CHANGE_HEADER_TITLE":
      return {
        ...state,
        headerTitle: action.headerTitle,
      };
    default:
      return state;
  }
};

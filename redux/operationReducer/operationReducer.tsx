// appReducer.ts
import { AppState, AppAction } from "../operationReducer/types";

const initialState: AppState = {
  operations: [],
};

export const operationReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "SET_OPERATIONS":
      return {
        ...state,
        operations: action.operations,
      };
    default:
      return state;
  }
};

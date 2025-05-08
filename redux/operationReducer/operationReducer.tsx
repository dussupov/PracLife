import { AppState, AppAction } from "../operationReducer/types";

const initialState: AppState = {
  operations: [],
  limits: [
    { type: 'cafe', limit: 0, currentLimit: 0 },
    { type: 'products', limit: 0, currentLimit: 0 },
    { type: 'car', limit: 0, currentLimit: 0 },
    { type: 'subscriptions', limit: 0, currentLimit: 0  },
    { type: 'taxi', limit: 0, currentLimit: 0  },
    { type: 'entertainment', limit: 0, currentLimit: 0 },
    { type: 'other', limit: 0, currentLimit: 0 },
  ],
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
    case "SET_LIMITS":
      return {
        ...state,
        limits: action.limits,
      };

    case "SET_CURRENT_LIMITS": {
      const updatedLimits = state.limits.map((limit) => {
        const currentLimit = action.limits.find((l) => l.type === limit.type);
        return {
          ...limit,
          currentLimit: currentLimit ? currentLimit.currentLimit : limit.currentLimit,
        };
      });
      return {
        ...state,
        limits: updatedLimits,
      };
    }
    default:
      return state;
  }
};

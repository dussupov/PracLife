export interface Operation {
  id: string;
  type: string;
  name: string;
  operation_number: string;
  value: number;
  date: string;
  wallet: string;
}

export interface Limit {
  type: string;
  limit: number;
  currentLimit: number;
}

export interface AppState {
  operations: Operation[];
  limits: Limit[];
}

export interface SetOperationAction {
  type: "SET_OPERATIONS";
  operations: any;
}

export interface SetLimitsAction {
  type: "SET_LIMITS";
  limits: any;
}

export interface SetCurrentLimitsAction {
  type: "SET_CURRENT_LIMITS";
  limits: any;
}



export type AppAction = SetOperationAction | SetLimitsAction | SetCurrentLimitsAction;

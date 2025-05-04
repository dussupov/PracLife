export interface Operation {
  id: string;
  type: string;
  name: string;
  operation_number: string;
  value: number;
  date: string;
  wallet: string;
}

export interface AppState {
  operations: Operation[];
}

export interface SetOperationAction {
  type: "SET_OPERATIONS";
  operations: any;
}


export type AppAction = SetOperationAction;

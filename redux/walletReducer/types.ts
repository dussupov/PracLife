export interface Wallet {
  id: string;
  type: string;
  name: string;
  wallet_number: string;
  value: number;
}

export interface AppState {
  wallets: Wallet[];
}

export interface SetWalletsAction {
  type: "SET_WALLETS";
  wallets: any;
}


export type AppAction = SetWalletsAction;

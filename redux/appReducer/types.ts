export interface AppState {
  headerTitle: string | null;
}

export interface ChangeHeaderTitleAction {
  type: "CHANGE_HEADER_TITLE";
  headerTitle: string;
}


export type AppAction = ChangeHeaderTitleAction;

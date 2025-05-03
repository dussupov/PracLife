import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {appReducer} from "./appReducer/appReducer";
import {walletReducer} from "@/redux/walletReducer/walletReducer";

const rootReducer = combineReducers({
  app: appReducer,
  wallet: walletReducer
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

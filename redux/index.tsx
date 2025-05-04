import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { appReducer } from './appReducer/appReducer';
import { walletReducer } from '@/redux/walletReducer/walletReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {operationReducer} from "@/redux/operationReducer/operationReducer";

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['wallet', 'operation'], // сохраняем только wallet
};

// root reducer
const rootReducer = combineReducers({
  app: appReducer,
  wallet: walletReducer,
  operation: operationReducer
});

// оборачиваем walletReducer в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// создаем store
export const store = createStore(persistedReducer, composeWithDevTools());

// создаем persistor
export const persistor = persistStore(store);

// типизация
export type RootState = ReturnType<typeof rootReducer>;

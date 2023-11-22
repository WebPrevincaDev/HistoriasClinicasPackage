import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from "./slices/auth";
import hcd from "./slices/hcd";
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth,
  hcd
});

//LISTA CON LA INFO QUE PERSISTE
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "hcd"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

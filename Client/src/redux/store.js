import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { authSlice } from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  auth: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import picsReducer from "./picsSlice";

export const store = configureStore({
  reducer: {
    pics: picsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

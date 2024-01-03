import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/user.slice";
import type { TypedUseSelectorHook } from "react-redux";
import reflectionSlice from "./slices/reflection.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    reflection: reflectionSlice
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

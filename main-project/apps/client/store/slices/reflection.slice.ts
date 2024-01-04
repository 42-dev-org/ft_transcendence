import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ErrorPayload {
  isError: boolean;
  callback?: Function | null;
  payload: any;
}

export interface LoadingPayload {
  isLoading: boolean;
  callback?: Function | null;
  payload: any;
}

export interface InitialStateType {
  ErrorPage: ErrorPayload;
  LoadingPage: LoadingPayload;
}

const initialState: InitialStateType = {
  LoadingPage: {
    callback: null,
    isLoading: false,
    payload: null,
  },
  ErrorPage: {
    isError: false,
    callback: null,
    payload: null,
  },
};

const refelctionSlice = createSlice({
  name: "reflection",
  initialState,
  reducers: {
    updateError: (state, { payload }: PayloadAction<ErrorPayload>) => {
      return {
        ...state,
        ErrorPage: {
          ...state.ErrorPage,
          ...payload,
        },
      };
    },
    updateLoading: (state, { payload }: PayloadAction<LoadingPayload>) => {
      return {
        ...state,
        LoadingPage: {
          ...state.LoadingPage,
          ...payload,
        },
      };
    },
    reset: (_) => initialState,
  },
});

export const { updateError, updateLoading, reset: resetReflection } = refelctionSlice.actions;

export default refelctionSlice.reducer;
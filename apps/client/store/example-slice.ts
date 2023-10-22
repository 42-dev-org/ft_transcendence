import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "example",
};

export const { actions: ExampleActions, reducer: ExmapleReducer } = createSlice(
  {
    initialState,
    name: "example",
    reducers: {
      example(state, _payload) {
        return {
          ...state,
        };
      },
    },
  }
);

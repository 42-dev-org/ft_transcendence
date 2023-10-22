import { configureStore } from "@reduxjs/toolkit";
import { ExmapleReducer } from "./example-slice";

export const store = configureStore({reducer: {
    example: ExmapleReducer
}})
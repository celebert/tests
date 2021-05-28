import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "../features/homeSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});

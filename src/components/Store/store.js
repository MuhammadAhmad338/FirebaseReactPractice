import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Counter/counter";

export const store = configureStore({
   reducer: {
      counter: counterReducer
   }
});
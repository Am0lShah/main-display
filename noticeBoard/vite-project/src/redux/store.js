import { configureStore } from "@reduxjs/toolkit";
import textDataReduces from "./slices/dataSlice.js"

export const store = configureStore({
  reducer: {
    textData: textDataReduces,
   
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev mode
});

export default store
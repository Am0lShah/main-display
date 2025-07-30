import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import textData from "./slices/userDataSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    textData: textData,
   
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev mode
});

export default store
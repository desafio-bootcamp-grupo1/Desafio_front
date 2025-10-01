import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import driverProfile from "../features/auth/driverProfileSlice";
import cookiesReducer from "../features/auth/cookiesSlice";


export const store = configureStore({
  reducer: {
  auth,
  driverProfile,
   cookies: cookiesReducer, 

  },
});

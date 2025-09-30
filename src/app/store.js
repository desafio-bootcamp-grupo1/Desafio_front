import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import driverProfile from "../features/auth/driverProfileSlice";


export const store = configureStore({
  reducer: {
    auth,
    driverProfile,     

  },
});

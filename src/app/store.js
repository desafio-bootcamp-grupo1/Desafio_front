import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import driverProfile from "../features/auth/driverProfileSlice";
import cookiesReducer from "../features/auth/cookiesSlice";
import tickets from "../features/tickets/ticketsSlice";
import overview from "../features/overview/overviewSlice";
import manager from "../features/manager/managersSlice";


export const store = configureStore({
  reducer: {
  auth,
  tickets,
  overview,
  manager,
  driverProfile,
   cookies: cookiesReducer, 

  },
});

import { configureStore } from "@reduxjs/toolkit";
import auth from "./src/features/auth/auth.slice";
import users from "./src/components/users/users.slice";

export const store = configureStore({
  reducer: {
    auth,   // state.auth se encarga features/auth/auth.slice.js
    users,  // state.users se encarga features/users/users.slice.js
    //etc
  },
});

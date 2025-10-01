
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accepted: localStorage.getItem("cookiesAccepted") === "true"
};

const cookiesSlice = createSlice({
  name: "cookies",
  initialState,
  reducers: {
    acceptCookies: (state) => {
      state.accepted = true;
      localStorage.setItem("cookiesAccepted", "true");
    },
    resetCookies: (state) => {
      state.accepted = false;
      localStorage.removeItem("cookiesAccepted");
    }
  }
});

export const { acceptCookies, resetCookies } = cookiesSlice.actions;
export default cookiesSlice.reducer;

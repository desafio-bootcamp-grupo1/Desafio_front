import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./src/features/api";
import { setAccessToken, clearAccessToken } from "./src/lib/token";

export const bootstrapSession = createAsyncThunk(
  "auth/bootstrapSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/refresh-token");
      if (!data?.accessToken) throw new Error("NO_ACCESS");
      setAccessToken(data.accessToken);
      const meRes = await api.get("/users/me");
      return meRes.data;
    } catch (e) {
      clearAccessToken();
      return rejectWithValue("REFRESH_FAIL");
    }
  }
);

const initialState = {
  ready: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // forzar logout desde cualquier sitio si hay error de tokens (?)
    authHardLogout(state) {
      state.user = null;
      state.ready = true;
      state.error = null;
      clearAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder
      //bootstrap (no lo de CSS xd) para auto cookies por http
      .addCase(bootstrapSession.pending, (state) => {
        state.ready = false;
        state.error = null;
      })
      .addCase(bootstrapSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.ready = true;
      })
      .addCase(bootstrapSession.rejected, (state, action) => {
        state.user = null;
        state.ready = true;
        state.error = action.payload || "REFRESH_FAIL";
      })
      // login
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "LOGIN_FAIL";
      });
    //añadir logout y register
  },
});

export const { authHardLogout } = authSlice.actions;
export default authSlice.reducer;

// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearAccessToken } from "@/lib/token";
import authService from "./authService";

// Thunk para login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login({ email, password });
      if (!data?.accessToken) throw new Error("NO_ACCESS");
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "LOGIN_FAIL");
    }
  }
);

// Thunk para bootstrapSession (ya lo tenías)
export const bootstrapSession = createAsyncThunk(
  "auth/bootstrapSession",
  async (_, { rejectWithValue }) => {
    try {
      const refreshed = await authService.refreshToken();
      if (!refreshed?.accessToken) throw new Error("NO_ACCESS");
      const me = await authService.getMe();
      return me;
    } catch {
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
    authHardLogout(state) {
      state.user = null;
      state.ready = true;
      state.error = null;
      clearAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder
      // bootstrap
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
        state.user = action.payload?.user ?? null;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "LOGIN_FAIL";
      });
  },
});

export const { authHardLogout } = authSlice.actions;
export default authSlice.reducer;

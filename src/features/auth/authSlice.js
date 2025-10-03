// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearAccessToken, setAccessToken } from "@/lib/token";
import authService from "./authService";

// Thunk para registro
export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const data = await authService.register({ email, password, username });
      if (!data?.accessToken) throw new Error("NO_ACCESS");
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "REGISTER_FAIL");
    }
  }
);

// Thunk para logout
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user?.accessToken;

      if (token) {
        setAccessToken(token);
      }

      await authService.logout();
      return true;
    } catch (err) {
      // Aunque falle el endpoint, limpiamos estado cliente
      clearAccessToken();
      return rejectWithValue(err?.response?.data || "LOGOUT_FAIL");
    }
  }
);

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

// Thunk para bootstrapSession
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

// NUEVO: Thunk para actualizar perfil - FALTABA ESTE
export const updateUserProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.updateUserProfile(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "UPDATE_PROFILE_FAIL");
    }
  }
);

const initialState = {
  ready: false,
  user: null,
  error: null,
  updating: false, // NUEVO: estado para actualización
  updateError: null, // NUEVO: error específico de actualización
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authHardLogout(state) {
      state.user = null;
      state.ready = true;
      state.error = null;
      state.updating = false;
      state.updateError = null;
      clearAccessToken();
    },
    clearUpdateError(state) {
      state.updateError = null;
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
        if (action.payload?.accessToken && state.user) {
          state.user.accessToken = action.payload.accessToken;
        }
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "LOGIN_FAIL";
      })
      // register
      .addCase(registerThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;

        if (action.payload?.accessToken && state.user) {
          state.user.accessToken = action.payload.accessToken;
        }
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "REGISTER_FAIL";
      })
      // logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        clearAccessToken();
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.user = null;
        clearAccessToken();
      })
      // NUEVO: updateUserProfileThunk
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.user = { ...state.user, ...action.payload };
        state.updateError = null;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
  },
});

export const { authHardLogout, clearUpdateError } = authSlice.actions;
export default authSlice.reducer;
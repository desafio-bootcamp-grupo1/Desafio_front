// overviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import overviewService from "./overviewService";

// ==================== USER OVERVIEW ====================
export const fetchUserOverview = createAsyncThunk(
  "overview/fetchUser",
  async ({ month }, { rejectWithValue }) => {
    try {
      const data = await overviewService.getUserOverview({ month });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error obteniendo overview:', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_OVERVIEW_FAIL");
    }
  }
);

// ==================== MANAGER OVERVIEW ====================
export const fetchManagerOverview = createAsyncThunk(
  "overview/fetchManager",
  async ({ month, top }, { rejectWithValue }) => {
    try {
      const data = await overviewService.getManagerOverview({ month, top });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error obteniendo manager overview:', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_MANAGER_OVERVIEW_FAIL");
    }
  }
);

// ==================== WORKER OVERVIEW ====================
export const fetchWorkerOverview = createAsyncThunk(
  "overview/fetchWorker",
  async ({ userId, month }, { rejectWithValue }) => {
    try {
      const data = await overviewService.getWorkerOverview({ userId, month });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error obteniendo worker overview:', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_WORKER_OVERVIEW_FAIL");
    }
  }
);

const initialState = {
  user: {
    loading: false,
    error: null,
    data: null,
    lastFetch: null
  },
  manager: {
    loading: false,
    error: null,
    data: null,
    lastFetch: null
  },
  worker: {
    loading: false,
    error: null,
    data: null,
    lastFetch: null,
    currentWorkerId: null
  }
};

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    clearOverviewError: (state) => {
      state.user.error = null;
      state.manager.error = null;
      state.worker.error = null;
    },
    clearUserOverview: (state) => {
      state.user.data = null;
      state.user.lastFetch = null;
    },
    clearManagerOverview: (state) => {
      state.manager.data = null;
      state.manager.lastFetch = null;
    },
    clearWorkerOverview: (state) => {
      state.worker.data = null;
      state.worker.lastFetch = null;
      state.worker.currentWorkerId = null;
    },
    resetOverviewState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // ========== USER OVERVIEW ==========
      .addCase(fetchUserOverview.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
        state.user.lastFetch = new Date().toISOString();
        state.user.error = null;
      })
      .addCase(fetchUserOverview.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        state.user.data = null;
      })
      
      // ========== MANAGER OVERVIEW ==========
      .addCase(fetchManagerOverview.pending, (state) => {
        state.manager.loading = true;
        state.manager.error = null;
      })
      .addCase(fetchManagerOverview.fulfilled, (state, action) => {
        state.manager.loading = false;
        state.manager.data = action.payload;
        state.manager.lastFetch = new Date().toISOString();
        state.manager.error = null;
      })
      .addCase(fetchManagerOverview.rejected, (state, action) => {
        state.manager.loading = false;
        state.manager.error = action.payload;
        state.manager.data = null;
      })
      
      // ========== WORKER OVERVIEW ==========
      .addCase(fetchWorkerOverview.pending, (state) => {
        state.worker.loading = true;
        state.worker.error = null;
      })
      .addCase(fetchWorkerOverview.fulfilled, (state, action) => {
        state.worker.loading = false;
        state.worker.data = action.payload;
        state.worker.lastFetch = new Date().toISOString();
        state.worker.currentWorkerId = action.meta.arg.userId;
        state.worker.error = null;
      })
      .addCase(fetchWorkerOverview.rejected, (state, action) => {
        state.worker.loading = false;
        state.worker.error = action.payload;
        state.worker.data = null;
        state.worker.currentWorkerId = null;
      });
  }
});

export const {
  clearOverviewError,
  clearUserOverview,
  clearManagerOverview,
  clearWorkerOverview,
  resetOverviewState
} = overviewSlice.actions;

export default overviewSlice.reducer;
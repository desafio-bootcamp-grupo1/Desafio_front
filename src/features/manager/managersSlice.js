// managerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerService from "./managersService";

// ==================== WORKERS LIST ====================
export const fetchWorkers = createAsyncThunk(
  "manager/fetchWorkers",
  async ({ q = '', page = 1, limit = 20, include = '' }, { rejectWithValue }) => {
    try {
      const data = await managerService.getWorkers({ q, page, limit, include });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_WORKERS_FAIL");
    }
  }
);

// ==================== WORKER TICKETS ====================
export const fetchWorkerTickets = createAsyncThunk(
  "manager/fetchWorkerTickets",
  async ({ userId, month, page = 1, limit = 20, domain }, { rejectWithValue }) => {
    try {
      const data = await managerService.getWorkerTickets({ userId, month, page, limit, domain });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error ', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_WORKER_TICKETS_FAIL");
    }
  }
);

const initialState = {
  workers: {
    loading: false,
    error: null,
    data: null,
    currentPage: 1,
    totalPages: 0,
    searchQuery: ''
  },
  workerTickets: {
    loading: false,
    error: null,
    data: null,
    currentPage: 1,
    totalPages: 0,
    currentWorkerId: null
  }
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    clearManagerError: (state) => {
      state.workers.error = null;
      state.workerTickets.error = null;
    },
    clearWorkers: (state) => {
      state.workers.data = null;
    },
    clearWorkerTickets: (state) => {
      state.workerTickets.data = null;
      state.workerTickets.currentWorkerId = null;
    },
    resetManagerState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // ========== WORKERS LIST ==========
      .addCase(fetchWorkers.pending, (state) => {
        state.workers.loading = true;
        state.workers.error = null;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.workers.loading = false;
        state.workers.data = action.payload;
        state.workers.currentPage = action.payload.page;
        state.workers.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        state.workers.searchQuery = action.meta.arg.q || '';
        state.workers.error = null;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.workers.loading = false;
        state.workers.error = action.payload;
        state.workers.data = null;
      })
      
      // ========== WORKER TICKETS ==========
      .addCase(fetchWorkerTickets.pending, (state) => {
        console.log('🟡 Redux: fetchWorkerTickets PENDING');
        state.workerTickets.loading = true;
        state.workerTickets.error = null;
      })
      .addCase(fetchWorkerTickets.fulfilled, (state, action) => {
        console.log('✅ Redux: fetchWorkerTickets FULFILLED', action.payload);
        state.workerTickets.loading = false;
        state.workerTickets.data = action.payload;
        state.workerTickets.currentPage = action.payload.page;
        state.workerTickets.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        state.workerTickets.currentWorkerId = action.meta.arg.userId;
        state.workerTickets.error = null;
      })
      .addCase(fetchWorkerTickets.rejected, (state, action) => {
        console.log('❌ Redux: fetchWorkerTickets REJECTED', action.payload);
        state.workerTickets.loading = false;
        state.workerTickets.error = action.payload;
        state.workerTickets.data = null;
        state.workerTickets.currentWorkerId = null;
      });
  }
});

export const {
  clearManagerError,
  clearWorkers,
  clearWorkerTickets,
  resetManagerState
} = managerSlice.actions;

export default managerSlice.reducer;
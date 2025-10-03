// features/tickets/ticketsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketsService from "./ticketsService";

export const createGasolinerasTicket = createAsyncThunk(
  "tickets/createGasolineras",
  async ({ file, fecha }, { rejectWithValue }) => {
    try {
      const data = await ticketsService.createGasolinerasTicket({ file, fecha });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error creando ticket:', err);
      return rejectWithValue(err?.response?.data || err?.message || "CREATE_GASOLINERAS_FAIL");
    }
  }
);

export const createPeajeTicket = createAsyncThunk(
  "tickets/createPeaje",
  async ({ file, fecha }, { rejectWithValue }) => {
    try {
      const data = await ticketsService.createPeajeTicket({ file, fecha });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error creando ticket:', err);
      return rejectWithValue(err?.response?.data || err?.message || "CREATE_PEAJE_FAIL");
    }
  }
);

export const fetchUserTickets = createAsyncThunk(
  "tickets/fetchUserTickets",
  async ({ page = 1, limit = 20, domain, from, to }, { rejectWithValue }) => {
    try {
      const data = await ticketsService.getUserTickets({ page, limit, domain, from, to });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_TICKETS_FAIL");
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  "tickets/fetchTicketById",
  async (ticketId, { rejectWithValue }) => {
    try {
      const data = await ticketsService.getTicketById(ticketId);
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error ', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_TICKET_FAIL");
    }
  }
);

export const fetchUserTicketsByUserId = createAsyncThunk(
  "tickets/fetchUserTicketsByUserId",
  async ({ userId, page = 1, limit = 20, domain, from, to }, { rejectWithValue }) => {
    try {
      const data = await ticketsService.getUserTicketsByUserId(userId, { page, limit, domain, from, to });
      return data;
    } catch (err) {
      console.error('❌ Redux thunk: Error obteniendo tickets del usuario', err);
      return rejectWithValue(err?.response?.data || err?.message || "FETCH_USER_TICKETS_FAIL");
    }
  }
);

const initialState = {
  creating: false,
  createError: null,
  lastCreated: null,
  
  list: {
    loading: false,
    error: null,
    data: null,
    currentPage: 1,
    totalPages: 0
  },
  
  current: {
    loading: false,
    error: null,
    data: null
  },

  userTickets: {
    loading: false,
    error: null,
    data: null,
    currentPage: 1,
    totalPages: 0,
    userId: null
  }
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearTicketsError: (state) => {
      state.createError = null;
      state.list.error = null;
      state.current.error = null;
      state.userTickets.error = null;
    },
    clearLastCreated: (state) => {
      state.lastCreated = null;
    },
    clearCurrentTicket: (state) => {
      state.current.data = null;
      state.current.error = null;
    },
    clearUserTickets: (state) => {
      state.userTickets.data = null;
      state.userTickets.error = null;
      state.userTickets.userId = null;
    },
    resetTicketsState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Create Gasolineras Ticket
      .addCase(createGasolinerasTicket.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.lastCreated = null;
      })
      .addCase(createGasolinerasTicket.fulfilled, (state, action) => {
        state.creating = false;
        state.lastCreated = action.payload;
        state.createError = null;
      })
      .addCase(createGasolinerasTicket.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
        state.lastCreated = null;
      })
      .addCase(createPeajeTicket.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.lastCreated = null;
      })
      .addCase(createPeajeTicket.fulfilled, (state, action) => {
        state.creating = false;
        state.lastCreated = action.payload;
        state.createError = null;
      })
      .addCase(createPeajeTicket.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
        state.lastCreated = null;
      })
      .addCase(fetchUserTickets.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.data = action.payload;
        state.list.currentPage = action.payload.page;
        state.list.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        state.list.error = null;
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
        state.list.data = null;
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.current.loading = true;
        state.current.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current.data = action.payload;
        state.current.error = null;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
        state.current.data = null;
      })
      .addCase(fetchUserTicketsByUserId.pending, (state) => {
        state.userTickets.loading = true;
        state.userTickets.error = null;
      })
      .addCase(fetchUserTicketsByUserId.fulfilled, (state, action) => {
        state.userTickets.loading = false;
        state.userTickets.data = action.payload;
        state.userTickets.currentPage = action.payload.page;
        state.userTickets.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        state.userTickets.userId = action.meta.arg.userId;
        state.userTickets.error = null;
      })
      .addCase(fetchUserTicketsByUserId.rejected, (state, action) => {
        state.userTickets.loading = false;
        state.userTickets.error = action.payload;
        state.userTickets.data = null;
        state.userTickets.userId = null;
      })
      
  }
});

export const {
  clearTicketsError,
  clearLastCreated,
  clearCurrentTicket,
  clearUserTickets,
  resetTicketsState
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
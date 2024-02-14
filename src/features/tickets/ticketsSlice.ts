import { createSlice } from '@reduxjs/toolkit';
import { fetchTicketsAsync } from '../tickets/ticketsAsyncThunk'
import { ITicket } from '../../components/TicketCard/ITicket';

interface TicketsState {
  tickets: ITicket[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: 'idle',
    error: null,
  } as TicketsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsAsync.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchTicketsAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(fetchTicketsAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export { fetchTicketsAsync };

export default ticketsSlice.reducer;

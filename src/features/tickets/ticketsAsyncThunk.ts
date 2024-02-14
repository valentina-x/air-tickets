import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTickets } from './ticketsAPI';

export const fetchTicketsAsync = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTickets();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Ошибка при загрузке билетов');
      } else {
        return rejectWithValue('Неизвестная ошибка при загрузке билетов');
      }
    }
  },
);



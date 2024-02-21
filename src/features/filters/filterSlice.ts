import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types/IFiltersState';

const initialState: FiltersState = {
  stops: [], 
  airlines: [],
  tariff: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStops: (state, action: PayloadAction<number | number[]>) => {
      state.stops = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    setAirlines: (state, action: PayloadAction<string | string[]>) => {
      state.airlines = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    setTariff: (state, action: PayloadAction<string>) => {
      state.tariff = action.payload;
    },
  },
});

export const { setStops, setAirlines, setTariff } = filterSlice.actions;

export default filterSlice.reducer;

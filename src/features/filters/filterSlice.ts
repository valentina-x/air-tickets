import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SET_STOPS, SET_AIRLINES, SET_TARIFF } from '../../types/filterActionTypes';
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

export const setStops = (stops: number[]) => ({
  type: SET_STOPS,
  payload: stops,
});

export const setAirlines = (airlines: string[]) => ({
  type: SET_AIRLINES,
  payload: airlines,
});

export const setTariff = (tariff: string) => ({
  type: SET_TARIFF,
  payload: tariff,
});

export default filterSlice.reducer;

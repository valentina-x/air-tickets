import { combineReducers } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filterReducer';
import ticketsReducer from '../features/tickets/ticketsSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
  tickets: ticketsReducer,
});

export default rootReducer;

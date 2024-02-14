import { FiltersState } from '../../types/IFiltersState';
import { SET_STOPS, SET_AIRLINES, SET_TARIFF } from '../../types/filterActionTypes';


interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

const initialState: FiltersState = {
  stops: [],
  airlines: [],
  tariff: ''
};

const filterReducer = (state: FiltersState = initialState, action: Action) => {
  switch (action.type) {
    case SET_STOPS:
      return { ...state, stops: action.payload };
    case SET_AIRLINES:
      return { ...state, airlines: action.payload };
    case SET_TARIFF:
      return { ...state, tariff: action.payload };
    default:
      return state;
  }
};

export default filterReducer;

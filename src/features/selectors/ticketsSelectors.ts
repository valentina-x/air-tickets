import { RootState } from "../../store/store";

export const selectTickets = (state: RootState) => state.tickets.tickets;

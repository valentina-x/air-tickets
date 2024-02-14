import axios from 'axios';
import { ITicket } from '../../components/TicketCard/ITicket';

export const fetchTickets = async () => {
  const apiUrl = './db.json';

  try {
    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: ITicket[] = response.data.tickets;

    return { data };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Ошибка загрузки билетов:', error.message);

    throw new Error('Ошибка загрузки билетов');
  }
};
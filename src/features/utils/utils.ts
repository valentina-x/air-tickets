import { ITicket } from '../../components/TicketCard/ITicket';
import { Filters } from '../../types/Filters';

export interface TicketTime {
  startTime: string;
  endTime: string;
}

export function formatCost(amount: number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const sortTickets = (tickets: ITicket[], filters: Filters) => {
  return [...tickets].filter((ticket) => {
    const stopsFilter = filters.stops.length === 0 || filters.stops.includes(ticket.stops);
    const airlinesFilter =
      filters.airlines.length === 0 || filters.airlines.includes(ticket.company);

    return stopsFilter && airlinesFilter;
  }).sort((a, b) => {
    if (filters.tariff === 'cheapest') {
      return a.price - b.price;
    } else if (filters.tariff === 'fastest') {
      return compareTotalTravelTime(a.time, b.time);
    } else if (filters.tariff === 'optimal') {
      const timeThreshold = 2 * 60 * 60 * 1000;
      const timeDifference = compareTotalTravelTime(a.time, b.time);
      const stopsDifference = a.stops - b.stops;

      if (timeDifference < timeThreshold) {
        const priceDifference = a.price - b.price;

        if (priceDifference !== 0) {
          return priceDifference;
        }
      }

      if (stopsDifference !== 0) {
        return stopsDifference;
      } else {
        return timeDifference;
      }
    } else {
      return 0;
    }
  });
};

// Сравнение общего времени в пути
export const compareTotalTravelTime = (timeA: TicketTime, timeB: TicketTime): number => {
  const totalTravelTimeA = getTotalTravelTime(timeA);
  const totalTravelTimeB = getTotalTravelTime(timeB);
  return totalTravelTimeA - totalTravelTimeB;
};

// Расчет общего времени в пути
export const getTotalTravelTime = (time: TicketTime): number => {
  const startDate = new Date(`2000-01-01T${time.startTime}`);
  const endDate = new Date(`2000-01-01T${time.endTime}`);
  const totalTravelTime = endDate.getTime() - startDate.getTime();
  return totalTravelTime;
};

export const formatTravelTime = (startTime: string, endTime: string): string => {
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);
  const timeDifference = endDate.getTime() - startDate.getTime();

  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

  if (hours === 0) {
    return `${minutes} мин`;
  }

  if (minutes === 0) {
    return `${hours} ч`;
  }

  return `${hours} ч ${minutes} мин`;
};

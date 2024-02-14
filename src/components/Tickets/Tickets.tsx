import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Ticket from '../TicketCard/TicketCard';
import { LoadButton } from '../LoadButton/LoadButton';
import { useCallback, useState } from 'react';
import { ITicket } from '../TicketCard/ITicket';
import { sortTickets } from '../../features/utils/utils';
import styles from './style.module.scss';

const Tickets: React.FC = () => {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const filters = useSelector((state: RootState) => state.filters);
  const [displayedTickets, setDisplayedTickets] = useState<number>(3);

  const sortedTickets: ITicket[] = sortTickets(tickets, filters);

  const handleLoadMore = useCallback(() => {
    setDisplayedTickets(displayedTickets + 3);
  }, [displayedTickets]);

  return (
    <div className={styles.tickets}>
      {sortedTickets.length > 0 ? (
        <>
          {sortedTickets.slice(0, displayedTickets).map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
          {displayedTickets < sortedTickets.length && <LoadButton onClick={handleLoadMore} />}
        </>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>По вашему запросу билеты не найдены</p>
      )}
    </div>
  );
};

export default Tickets;

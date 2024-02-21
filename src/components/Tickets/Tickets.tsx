import React from 'react';
import Ticket from '../TicketCard/TicketCard';
import { LoadButton } from '../LoadButton/LoadButton';
import { useCallback, useState } from 'react';
import { ITicket } from '../TicketCard/ITicket';
import { sortTickets } from '../../features/utils/utils';
import styles from './style.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { selectTickets } from '../../features/selectors/ticketsSelectors';
import { selectFilters } from '../../features/selectors/filtersSelectors';

const Tickets: React.FC = () => {
  const tickets = useAppSelector(selectTickets);
  const filters = useAppSelector(selectFilters);
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

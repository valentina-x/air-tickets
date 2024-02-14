import { formatCost, formatTravelTime } from '../../features/utils/utils';
import { ITicket } from './ITicket';
import styles from './style.module.scss';

interface Ticket {
  ticket: ITicket;
}

const TicketCard: React.FC<Ticket> = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div className={`${styles.ticket__row} ${styles.ticket__row_fixheight}`}>
        <span className={styles.ticket__price}>
          {ticket.price > 0 ? `${formatCost(ticket.price)} ${ticket.currency}` : 'Цена по запросу'}
        </span>
        <div className={styles.ticket__logo}>
          <img src={`${ticket.company_logo}`} alt={`Лого компании`} />
        </div>
      </div>
      <div className={styles.ticket__row}>
        <div className={styles.ticket__info}>
          <span>
            {ticket.from} - {ticket.to}
          </span>
          {ticket.time.startTime} - {ticket.time.endTime}
        </div>
        <div className={styles.ticket__info}>
          <span>В пути</span>
          {formatTravelTime(ticket.time.startTime, ticket.time.endTime)}
        </div>
        <div className={styles.ticket__info}>
          <span>Пересадки</span>
          {ticket.stops == 1
            ? `${ticket.stops} пересадка`
            : ticket.stops == 0
            ? `Без пересадок`
            : `${ticket.stops} пересадки`}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;

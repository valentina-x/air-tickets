import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ITicket } from '../TicketCard/ITicket';
import CustomList from '../CustomList/CustomList';
import ArrowIMG from '../../assets/arrow.png';
import { useOnClickOutside } from 'usehooks-ts';

interface propsList {
  label: string;
  title: string;
  list: string[];
  type: string;
  random: number;
}

export const Sidebar: React.FC = () => {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const filters = useSelector((state: RootState) => state.filters);

  // состояние для кол-ва пересадок и компаний
  const [stops, setStops] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  // фильтр в МВ (открыть/закрыть)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const refSidebar = useRef(null);
  const handleUserClick = (): void => {
    setIsFilterActive(!isFilterActive);
  };
  const handleClickOutside = (): void => {
    setIsFilterActive(false);
  };
  useOnClickOutside(refSidebar, handleClickOutside);
  // ---

  useEffect(() => {
    if (!dataLoaded && tickets.length > 0) {
      const companiesSet = new Set<string>();
      const stopsSet = new Set<string>();

      const sortedTickets: ITicket[] = [...tickets].sort((a, b) => a.stops - b.stops);

      sortedTickets.forEach((ticket) => {
        companiesSet.add(ticket.company);

        switch (ticket.stops) {
          case 0:
            stopsSet.add('Без пересадок');
            break;
          case 1:
            stopsSet.add('1 пересадка');
            break;
          case 2:
            stopsSet.add('2 пересадки');
            break;
          default:
            stopsSet.add('3 пересадки');
            break;
        }
      });

      setCompanies(Array.from(companiesSet));
      setStops(Array.from(stopsSet));
      setDataLoaded(true);
    }
  }, [tickets, dataLoaded]);

  const initialPropsListStops: propsList = {
    label: 'stops',
    title: 'Количество пересадок',
    list: stops,
    type: 'checkbox',
    random: Math.random(),
  };

  const initialPropsListCompany: propsList = {
    label: 'company',
    title: 'Компании',
    list: companies,
    type: 'checkbox',
    random: Math.random(),
  };

  return (
    <aside
      className={`${styles.sidebar} ${isFilterActive ? styles.sidebar_active : ''}`}
      ref={refSidebar}
    >
      <div className={styles.sidebar__header} onClick={handleUserClick}>
        <div className={styles.sidebar__filterresult}>
          <span>
            {filters.airlines.length > 0
              ? filters.airlines.map((company: string) => company).join(', ')
              : 'Любая авиакомпания'}
          </span>
          ,
          <span>
            {filters.stops.length > 0
              ? `пересадок: ${filters.stops.join(', ')}`
              : 'любое кол-во пересадок'}
          </span>
        </div>
        <div className={styles.sidebar__settings} onClick={handleUserClick}>
          <span>Открыть настройки</span>
          <img src={ArrowIMG} alt='open_settings' width={20} height={12} />
        </div>
      </div>
      <CustomList {...initialPropsListStops} />
      <CustomList {...initialPropsListCompany} />
    </aside>
  );
};

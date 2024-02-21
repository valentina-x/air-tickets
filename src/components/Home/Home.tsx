import React, { useEffect } from 'react';
import { fetchTicketsAsync } from '../../features/tickets/ticketsAsyncThunk';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Filter from '../../components/TariffSelector/TariffSelector';
import Tickets from '../Tickets/Tickets';
import { Sidebar } from '../Sidebar/Sidebar';
import { useAppDispatch } from '../../hooks/hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTicketsAsync());
  }, [dispatch]);

  return (
    <main className={styles.home}>
      <Header />
      <Sidebar />
      <Filter />
      <Tickets />
    </main>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTicketsAsync } from '../../features/tickets/ticketsAsyncThunk';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Filter from '../../components/TariffSelector/TariffSelector';
import Tickets from '../Tickets/Tickets';
import { AppDispatch } from '../../store/store';
import { Sidebar } from '../Sidebar/Sidebar';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

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

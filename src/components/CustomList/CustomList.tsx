import React from 'react';
import styles from './styles.module.scss';
import OkIMG from '../../assets/ok.png';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAirlines, setStops } from '../../features/filters/filterSlice';

interface CustomListProps {
  label: string;
  title: string;
  list: string[];
  type: string;
  random: number;
}

const CustomList: React.FC<CustomListProps> = ({ ...props }) => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch: AppDispatch = useDispatch();

  const handleFilterChange = (item: string | number) => {
    const normalizedItem = typeof item === 'string' ? item.normalize() : item;

    if (props.label === 'company') {
      const updatedAirlines = filters.airlines.includes(normalizedItem)
        ? filters.airlines.filter((airline: string) => airline !== normalizedItem)
        : [...filters.airlines, normalizedItem];

      dispatch(setAirlines(updatedAirlines));
    } else {
      const updatedStops = filters.stops.includes(normalizedItem)
        ? filters.stops.filter((stop: number) => stop !== normalizedItem)
        : [...filters.stops, normalizedItem];

      dispatch(setStops(updatedStops));
    }
  };

  return (
    <div className={styles.sidelist}>
      <div className={styles.sidelist__title}>{props.title}</div>
      {props.list &&
        props.list.map((item, index) => (
          <div className={styles.sidelist__item} key={`${index}-${props.random}`}>
            <input
              type={props.type}
              id={`${index}-${props.random}`}
              name={`sidelist-${index}-${props.random}`}
              value={`${props.label === 'stops' ? index : item}`}
              onChange={() => handleFilterChange(props.label === 'stops' ? index : item)}
              checked={
                props.label === 'stops'
                  ? filters.stops.includes(index)
                  : filters.airlines.includes(item)
              }
            />
            <label htmlFor={`${index}-${props.random}`} className={styles.sidelist__item_label}>
              <div
                className={
                  props.label === 'stops'
                    ? styles.sidelist__item_checkbox
                    : styles.sidelist__item_radio
                }
              >
                <img src={OkIMG} alt='ok' width={15} height={15} />
              </div>
              <span>{item}</span>
            </label>
          </div>
        ))}
    </div>
  );
};

export default CustomList;

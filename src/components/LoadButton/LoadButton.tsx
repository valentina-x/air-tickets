import styles from './style.module.scss';

interface LoadButtonProps {
  onClick: () => void;
}

export const LoadButton: React.FC<LoadButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.loadbutton} type='button' onClick={onClick}>
      Загрузить еще билеты
    </button>
  );
};

import logo from "../../assets/logo.png";
import styles from "./style.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src={logo} alt="logo" width={100} height={80} />
      </div>
      <h1 className={styles.header__title}>Поиск авиабилетов</h1>
    </header>
  );
}

export default Header;

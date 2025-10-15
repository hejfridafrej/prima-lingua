import LanguageBar from './LanguageBar';
import styles from "./Header.module.css";

function Header() {

  return (
        <div className={styles.main}>
      <div className={styles.header}>
        <h1> Prima Lingua</h1>
        <LanguageBar />
      </div>
    </div>
  )
}

export default Header;


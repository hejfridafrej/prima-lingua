import LanguageBar from './LanguageBar';
import Navbar from './Navbar';
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headerBar}>
      <div className={styles.leftSection}>
        <div className={styles.appName}>
          <h1> Prima</h1>
          <h1>Lingua</h1>
        </div>
      </div>

      <div className={styles.centerSection}>
        <Navbar />
      </div>
      <div className={styles.rightSection}>
        <LanguageBar />
      </div>
    </div>
  )
}

export default Header;


import { useMediaQuery } from '../hooks/useMediaQuery';
import LanguageBar from './LanguageBar';
import Navbar from './Navbar';
import styles from "./Header.module.css";

const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const Appname = () => {
    return (
      <div className={styles.appName}>
        <h1> Prima</h1>
        <h1>Lingua</h1>
      </div>
    )
  }
  return isMobile ? (
    <div className={styles.headerBar}>
      <div className={styles.jointSection}>
        <div className={styles.leftSection}>
          <Appname />
        </div>
        <div className={styles.rightSection}>
          <LanguageBar />
        </div>
      </div>

      <div className={styles.centerSection}>
        <Navbar />
      </div>
    </div>

  ) : (
    <div className={styles.headerBar}>
      <div className={styles.leftSection}>
        <Appname />
      </div>
      <div className={styles.rightSection}>
        <LanguageBar />
      </div>
      <div className={styles.centerSection}>
        <Navbar />
      </div>
    </div>
  )
}

export default Header;
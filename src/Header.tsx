import LanguageBar from './LanguageBar';
import Navbar from './Navbar';
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.appName}>
      <h1> Prima</h1>
      <h1>Lingua</h1>
      </div>
      <Navbar />
      <LanguageBar />
    </div>
  )
}

export default Header;


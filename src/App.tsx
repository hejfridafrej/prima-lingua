
import Vocabulary from './Vocabulary';
import Header from './Header';
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <Vocabulary />
    </div>
  )
}

export default App

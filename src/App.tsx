
import Vocabulary from './Vocabulary';
import Header from './Header';
import Footer from './Footer'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <Vocabulary />
      <Footer />
    </div>
  )
}

export default App

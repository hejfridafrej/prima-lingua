
import AboutPage from './pages/About';
import LanguagePage from './pages/Languages';
import Vocabulary from './pages/Vocabulary';
import Header from './components/Header';
import Footer from './components/Footer'
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
  return (
    <Router>
      <div className={styles.main}>
        <div className={styles.header}>
          <Header />
        </div>

          <div className={styles.pageContent}>
        <Routes>
            <Route path="" element={<Vocabulary />} />
            <Route path="/languages" element={<LanguagePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
          </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App

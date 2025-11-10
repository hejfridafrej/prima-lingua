
import AboutPage from './pages/About';
import LanguagePage from './pages/Languages';
import Vocabulary from './Vocabulary';
import Header from './Header';
import Footer from './Footer'
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
  return (
    <Router>
        <div className={styles.main}>
          <Header />
      <Routes>
          <Route path="" element={<Vocabulary />} />
          <Route path="/languages" element={<LanguagePage />} />
          <Route path="/about" element={<AboutPage />} />
      </Routes>
          <Footer />
        </div>
    </Router>
  )
}

export default App

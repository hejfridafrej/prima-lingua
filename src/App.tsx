import { LanguageProvider } from './LanguageContext';
import Vocabulary from './Vocabulary';
import Header from './Header';


function App() {
  return (
    <LanguageProvider>
      <Header />
      <Vocabulary />
    </LanguageProvider>
  )
}

export default App

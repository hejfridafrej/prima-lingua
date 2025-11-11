
import { useLanguage } from '../LanguageContext';
import WordCard from '../components/WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary, error } = useLanguage();

  return (
    <div className={styles.vocabularyBox}>
      <h2>Vocabulary</h2>
      {isLoadingVocabulary ? (
        <h2>Loading vocabulary...</h2>
      ) :
        error ? (<h3>Error: {error}</h3>) : (
          <div className={styles.wordGrid}>
          {vocabulary?.map((word) => (
            <WordCard key={word._id} word={word} />
          ))}
          </div>
        )
      }
    </div>
  )
}

export default Vocabulary;


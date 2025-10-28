
import { useLanguage } from './LanguageContext';
import WordCard from './WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary, error } = useLanguage();

  return (
    <div className={styles.vocabularyBox}>
      {isLoadingVocabulary ? (
        <h2>Loading vocabulary...</h2>
      ) :
        error ? (<h3>Error: {error}</h3>) :
          vocabulary?.map((word) => (
            <WordCard key={word._id} word={word} />
          ))

      }
    </div>
  )
}

export default Vocabulary;


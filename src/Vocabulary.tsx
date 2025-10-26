
import { useLanguage } from './LanguageContext';
import WordCard from './WordCard'
import Loader from './Loader';
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary, error } = useLanguage();

  return (
    <>
      {isLoadingVocabulary ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.vocabularyBox}>
          {error ? (<div><h3>Error: {error}</h3></div>) :
            vocabulary?.map((word) => (
              <WordCard key={word._id} word={word} />
            ))
          }
        </div>
      )}
    </>
  )
}

export default Vocabulary;


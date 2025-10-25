
import { useLanguage } from './LanguageContext';
import WordCard from './WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary } = useLanguage();

  return (
        <>
          {isLoadingVocabulary ? (
            <h3>Loading...</h3> // TODO: Change to animate between languages
          ) : (
            <div className={styles.vocabularyBox}>
              {vocabulary?.map((word) => (
                <WordCard key={word._id} word={word} />
              ))}
            </div>
          )}
        </>
  )
}

export default Vocabulary;


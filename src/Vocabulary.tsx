
import { useLanguage } from './LanguageContext';
import WordCard from './WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary } = useLanguage();
  if (isLoadingVocabulary) return <div className={styles.main}>Loading...</div>;

  return (
        <div className={styles.main}>
      <div className={styles.vocabularyBox}>
        {vocabulary?.map((word) => (
          <WordCard key={word._id} word={word} />
        ))}
      </div>
    </div>
  )
}

export default Vocabulary;


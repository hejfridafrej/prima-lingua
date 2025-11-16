
import { useEffect, useState } from 'react';
import { useLanguage, type VocabularyItem } from '../LanguageContext'
import FilterBar from '../components/FilterBar';
import WordCard from '../components/WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary, filterState, error } = useLanguage();
  const [filteredVocab, setFilteredVocab] = useState<VocabularyItem[]>(vocabulary);

  const generateFilteredVocabulary = () => {
    const filteredVocabulary = vocabulary.filter(item => {
      const categoryMatch = filterState.categories.length === 0 ||
        filterState.categories.some(cat => cat.name === item.category.name);

      const classMatch = filterState.classes.length === 0 ||
        filterState.classes.some(cls => cls.name === item.class.name);

      return categoryMatch && classMatch;
    })
    return filteredVocabulary;
  }

  useEffect(() => {
    try {
      const newFilteredVocab = generateFilteredVocabulary();
      setFilteredVocab(newFilteredVocab);
    } catch (e) {
      console.log(e);
    }
  }, [filterState, vocabulary, isLoadingVocabulary])

  return (
    <div className={styles.vocabularyBox}>
      <h2>Vocabulary</h2>
      {isLoadingVocabulary ? (
        <h2>Loading vocabulary...</h2>
      ) :
        error ? (<h3>Error: {error}</h3>) : (
          <>
            <FilterBar />
            <div className={styles.wordGrid}>
              {filteredVocab?.map((word) => (
                <WordCard key={word._id} word={word} />
              ))}
            </div>
          </>
        )
      }
    </div>
  )
}

export default Vocabulary;


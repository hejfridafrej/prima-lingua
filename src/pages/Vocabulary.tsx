import { useEffect, useState } from 'react';
import { useLanguage, type VocabularyItem } from '../LanguageContext'
import FilterBar from '../components/FilterBar';
import WordCard from '../components/WordCard'
import styles from "./Vocabulary.module.css";

function Vocabulary() {
  const { vocabulary, isLoadingVocabulary, filterState, error } = useLanguage();
  const [filteredVocab, setFilteredVocab] = useState<VocabularyItem[]>(vocabulary);

  useEffect(() => {
    try {
      const filteredVocabulary = vocabulary.filter(item => {
        const categoryMatch = filterState.categories.length === 0 ||
          filterState.categories.some(cat => cat.name === item.category.name);

        const classMatch = filterState.classes.length === 0 ||
          filterState.classes.some(cls => cls.name === item.class.name);

        return categoryMatch && classMatch;
      })
      setFilteredVocab(filteredVocabulary);
      if (filteredVocabulary.length === 0 && vocabulary.length > 0) {
        throw new Error('No words found with the selected filters'); {/* TODO: Create error class, display error to user*/ }
      }
    } catch (e) {
      console.error(e);
    }
  }, [filterState, vocabulary])

  return (
    <div className={styles.vocabularyContainer}>
      {isLoadingVocabulary ? (
        <h2>Loading vocabulary...</h2>
      ) :
        error ? (<h3>Error: {error}</h3>) : (
          <>
            <FilterBar />
            <div className={styles.vocabularyBox}>
              {filteredVocab.length ? (
                <div className={styles.wordGrid}>
                  {filteredVocab.map((word) => (
                    <WordCard key={word._id} word={word} />
                  ))}
                </div>
              ) : (
                <h3>No words found</h3>
              )}
            </div>
          </>
        )
      }
    </div>
  )
}

export default Vocabulary;


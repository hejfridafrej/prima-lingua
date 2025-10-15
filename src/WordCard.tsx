import { useState, useEffect } from 'react';
import { type Language, languageService } from './services/api.ts';
import styles from "./WordCard.module.css"
import type { VocabularyItem } from './LanguageContext.tsx';

interface WordCardProps {
  word: VocabularyItem;
}

const WordCard = ( {word }: WordCardProps) => {
    return (
        <div className={styles.wordCard}>
            <div key={word.sourceTranslation._id} className={styles.translation}>
                <span>{word.sourceTranslation.translation}</span>
                </div>

            <div key={word.targetTranslation._id} className={styles.translation}>

                <span>{word.targetTranslation.translation}</span>
            </div>
            <p>{word.class} | {word.category}</p>
        </div>
    )
}

export default WordCard
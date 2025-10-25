import { useState } from 'react';
import type { VocabularyItem } from './LanguageContext.tsx';
import styles from "./WordCard.module.css"
import { capitalizeWord } from "./utils.tsx";

interface WordCardProps {
  word: VocabularyItem;
}

const WordCard = ( {word }: WordCardProps) => {
    const [sourceActive, setSourceActive] = useState(false);
    const flipCard = () => {
        setSourceActive(!sourceActive);
    }
    return (
        <div className={`${styles.wordCard} ${sourceActive ? styles.flipped : ""}`} onClick={() => flipCard()}>
            <div key={word.sourceTranslation._id} className={styles.translation}>
                <div className={styles.wordData}>
                    <span>{sourceActive ? capitalizeWord(word.sourceTranslation.translation) : capitalizeWord(word.targetTranslation.translation)}</span>
                </div>
                </div>
            <p>{word.class} {(!word.class || !word.category) ? null : ("|")} {word.category}</p>
        </div>
    )
}

export default WordCard
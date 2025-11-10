import { useState, useEffect } from "react";
import { translationService, type Translation, type Language, type Word, wordService } from "./services/api";
import styles from "./LanguageCard.module.css";

interface LanguageCardProps {
    language: Language;
}

const LanguageItem = ({ language }: LanguageCardProps) => {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        const languageTranslations = async () => {
            const translations = await translationService.getTranslationsByLanguage(language._id);
            const words = await wordService.getAllWords();
            setWords(words);
            setTranslations(translations);
        };
        languageTranslations();
    }, [language]);



    return (
        <div key={language.name} className={styles.wordCard}>
            <h3>{language.name}</h3>
            <h4>{language?.native_name}</h4>
            <p>{translations.length} of {words.length} words translated</p>
            {/* <button disabled>Contribute</button>  */} {/* Future feature */}
        </div>

    )
}

export default LanguageItem;
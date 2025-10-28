import { type Language } from './services/api';
import { useLanguage } from './LanguageContext';
import styles from './LanguageBar.module.css'

const LanguageBar = () => {
    const { availableLanguages, sourceLanguage, targetLanguage, isLoadingLanguages, setLanguages } = useLanguage();

    const selectSourceLanguage = (language: Language) => {
        setLanguages(language.name, targetLanguage);
        return;
    }

    const selectTargetLanguage = (language: Language) => {
        setLanguages(sourceLanguage, language.name);
    }

    return (
        <div className={styles.languageBar}>
            {isLoadingLanguages ? (
                <h2> Loading languages...</h2>
            ) : (
                <>
                    <div className={styles.availableLanguages}>
                        {availableLanguages?.map((language) => (
                            <h2 key={language._id} className={`${styles.languageHeadings} ${language.name == sourceLanguage ? styles.selected : ""}`} onClick={() => selectSourceLanguage(language)}>{language.name}</h2>
                        ))}
                    </div>
                    <h2>to</h2>
                    <div className={styles.availableLanguages}>
                        {availableLanguages?.map((language) => (
                            <h2 key={language._id} className={`${styles.languageHeadings} ${language.name == targetLanguage ? styles.selected : ""}`} onClick={() => selectTargetLanguage(language)}>{language.name}</h2>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default LanguageBar;
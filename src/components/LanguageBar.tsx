import { useLanguage } from '../LanguageContext';
import styles from './LanguageBar.module.css'

const LanguageBar = () => {
    const { availableLanguages, sourceLanguage, targetLanguage, isLoadingLanguages, setLanguages } = useLanguage();

    const selectSourceLanguage = (languageId: string) => {
        setLanguages(languageId, targetLanguage);
        return;
    }

    const selectTargetLanguage = (languageId: string) => {
        setLanguages(sourceLanguage, languageId);
    }

    return (
        <div className={styles.languageBar}>
            {isLoadingLanguages ? (
                <h2> Loading languages...</h2>
            ) : (
                <>
                    <div className={styles.languageDropdown}>
                        <select className={styles.hiddenInput} onChange={(e) => selectSourceLanguage(e.target.value)} name="sourceLanguage" id="sourceLanguage" value={sourceLanguage}>
                            {availableLanguages?.map((language) => (
                                <option key={language._id} className={styles.option} value={language._id}>{language.name}</option>
                            ))}
                        </select>
                    </div>
                    <h2>to</h2>
                    <div className={styles.languageDropdown}>
                        <select className={styles.hiddenInput} onChange={(e) => selectTargetLanguage(e.target.value)} name="targetLanguage" id="targetLanguage" value={targetLanguage}>
                            {availableLanguages?.map((language) => (
                                <option key={language._id} value={language._id}>{language.name}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    )
}

export default LanguageBar;
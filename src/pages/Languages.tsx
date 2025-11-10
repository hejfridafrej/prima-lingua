import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { type Language } from "../services/api";
import LanguageCard from "../LanguageCard";
import styles from "./Languages.module.css";

const Languages = () => {
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<Language[] | null>([]);
    const { availableLanguages } = useLanguage();
    useEffect(() => {
        setLoading(true);
        try {
            setLanguages(availableLanguages);
            // Fetching is now handled in LanguageContext
        } catch (error) {
            console.error("Error loading languages:", error);
        }
        setLoading(false);
    }, [availableLanguages]);
    return (
        <div className={styles.languagePage}>
            <h2>Available languages</h2>
            {loading ? <h3>Loading languages...</h3> : (
                <div className={styles.languageGrid}>
                    {languages ?
                        languages.map((lang) => (
                            <LanguageCard key={lang._id} language={lang} />
                        ))
                        : (<h3>No languages available</h3>)}
                </div>
            )}
        </div>
    )
}

export default Languages;
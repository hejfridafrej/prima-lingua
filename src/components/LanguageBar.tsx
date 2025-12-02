import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import type { SelectOption } from './CustomSelect';
import styles from './LanguageBar.module.css'
import CustomSelect from './CustomSelect';

const LanguageBar = () => {
    const { availableLanguages, sourceLanguage, targetLanguage, isLoadingLanguages, setLanguages } = useLanguage();
    const [languageOptions, setLanguageOptions] = useState<SelectOption[]>([]);
    const [targetName, setTargetName] = useState<string | null>(null);
    const [sourceName, setSourceName] = useState<string | null>(null);

    useEffect(() => {
        if (availableLanguages && availableLanguages.length) {
            const options = availableLanguages.map((language) => ({
                value: language._id,
                label: language.name
            }));
            setLanguageOptions(options);
        }
    }, [availableLanguages]);

    useEffect(() => {
        if (sourceLanguage) {
            const sourceLang = languageOptions.find(lang => lang.value === sourceLanguage);
            if (sourceLang) {
                setSourceName(sourceLang.label);
            }
        } else {
            setSourceName(null);
        }

        if (targetLanguage) {
            const targetLang = languageOptions.find(lang => lang.value === targetLanguage);
            if (targetLang) {
                setTargetName(targetLang.label);
            }

        }
    }, [sourceLanguage, targetLanguage, availableLanguages]);

    const selectSourceLanguage = (language: SelectOption) => {
        if (!language) return;
        setSourceName(language.label);
        setLanguages(language.value, targetLanguage);
        return;
    }

    const selectTargetLanguage = (language: SelectOption) => {
        if (!language) return;
        setTargetName(language.label);
        setLanguages(sourceLanguage, language.value);
    }

    return (
        <div className={styles.languageBar}>
            {isLoadingLanguages ? (
                <h2> Loading languages...</h2>
            ) : (
                <>
                    <CustomSelect
                        options={languageOptions}
                        value={sourceLanguage || null}
                        onChange={selectSourceLanguage}
                        placeHolder={sourceName ? sourceName : "Source language"}
                        size='large'
                    />
                    <CustomSelect
                        options={languageOptions}
                        value={targetLanguage || null}
                        onChange={selectTargetLanguage}
                        placeHolder={targetName ? targetName : "Target language"}
                        size='large'
                    />
                </>
            )}
        </div>
    )
}

export default LanguageBar;
import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import type { SelectOption } from './CustomSelect';
import styles from './LanguageBar.module.css'
import CustomSelect from './CustomSelect';

const LanguageBar = () => {
    const { availableLanguages, sourceLanguage, targetLanguage, isLoadingLanguages, setLanguages } = useLanguage();
    const [languageOptions, setLanguageOptions] = useState<SelectOption[]>([]);


    useEffect(() => {
        if (availableLanguages && availableLanguages.length) {
            const options = availableLanguages.map((language) => ({
                value: language._id,
                label: language.name
            }));
            setLanguageOptions(options);
        }
    }, [availableLanguages]);

    const selectSourceLanguage = (language: SelectOption) => {
        if (!language) return;
        setLanguages(language.value, targetLanguage);
    }

    const selectTargetLanguage = (language: SelectOption) => {
        if (!language) return;
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
                        placeHolder={sourceLanguage ? languageOptions.find(lang => lang.value === sourceLanguage)?.label : "Source language"}
                        size='small'
                    />
                    <CustomSelect
                        options={languageOptions}
                        value={targetLanguage || null}
                        onChange={selectTargetLanguage}
                        placeHolder={targetLanguage ? languageOptions.find(lang => lang.value === targetLanguage)?.label : "Target language"}
                        size='small'
                    />
                </>
            )}
        </div>
    )
}

export default LanguageBar;
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translationService, wordService, type Translation, type Language, type Word, languageService } from './services/api.ts';

interface LanguageContextType {
    availableLanguages: Language[] | null;
    sourceLanguage: string; // TODO: Change to Language?
    targetLanguage: string;
    vocabulary: VocabularyItem[];
    isLoadingVocabulary: boolean;
    setSourceLanguage: (lang: string) => void;
    setTargetLanguage: (lang: string) => void;
    refreshVocabulary: () => Promise<void>;
    setLanguages: (source: string, target: string) => void;
}

export interface VocabularyItem extends Word {
    sourceTranslation: Translation;
    targetTranslation: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [availableLanguages, setAvailableLanguages] = useState<Language[] | null>(null);
    const [sourceLanguage, setSourceLanguage] = useState<string>(
        () => localStorage.getItem('sourceLanguage') || 'English'
    );
    const [targetLanguage, setTargetLanguage] = useState<string>(
        () => localStorage.getItem('targetLanguage') || 'Spanish'
    );
    const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
    const [sourceVocabulary, setSourceVocabulary] = useState<Translation[]>([]);
    const [targetVocabulary, setTargetVocabulary] = useState<Translation[]>([])
    const [isLoadingVocabulary, setIsLoadingVocabulary] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLanguages = async () => {
        try {
            let languages = await languageService.getAllLanguages();
            if (languages.length > 0) {
                setAvailableLanguages(languages);
            } else {
                setError('No languages found');
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to fetch languages')
        }
    }

    const fetchTranslationVocabulary = async () => {
        try {
            const sourceLanguageObject = await languageService.getLanguageByName(sourceLanguage);
            let sourceVocab = await translationService.getTranslationsByLanguage(sourceLanguageObject.short_name);
            sourceVocab = sourceVocab.filter((vocabularyItem) => vocabularyItem.translation);

            const targetLanguageObject = await languageService.getLanguageByName(targetLanguage);
            let targetVocab = await translationService.getTranslationsByLanguage(targetLanguageObject.short_name);
            targetVocab = targetVocab.filter((vocabularyItem) => vocabularyItem.translation);

            if (sourceVocab) {
                setSourceVocabulary(sourceVocab);
            }
            if (targetVocab) {
                setTargetVocabulary(targetVocab);
            }
            return { source: sourceVocab, target: targetVocab }
        } catch (e) {
            console.error("Error details:", e);
            setError(e instanceof Error ? e.message : 'Failed to fetch languages')
        }
    }

    const createVocabulary = async (sourceVocabulary: Translation[], targetVocabulary: Translation[]): Promise<VocabularyItem[]> => {
        const paired = await Promise.all(
            sourceVocabulary?.map(async (sourceTranslation: Translation) => {
                const targetTranslation = targetVocabulary?.find(
                    t => t.word_id === sourceTranslation.word_id
                );

                if (targetTranslation) {
                    const word = await wordService.getWordById(sourceTranslation.word_id);
                    const vocabularyItem: VocabularyItem = {
                        ...word,
                        sourceTranslation: sourceTranslation,
                        targetTranslation: targetTranslation
                    };
                    return vocabularyItem;
                }
                return null;
            }) || []
        );
        // Filter out null values
        return paired.filter((item): item is VocabularyItem => item !== null);
    }

    const refreshVocabulary = async () => {
        setIsLoadingVocabulary(true);
        try {

            const result = await fetchTranslationVocabulary()
            if (!result) {
                return;
            }
            const { source, target } = result;
            const vocab = await createVocabulary(source, target);
            setVocabulary(vocab);

        } catch (err) {
            setError('Failed to load vocabulary');
            console.error(err);
        } finally {
            setIsLoadingVocabulary(false);
        }
    }

    useEffect(() => {
        try {
            fetchLanguages();
            createVocabulary(sourceVocabulary, targetVocabulary)
        } catch (e) {
            setError('Failed to load vocabulary');
            console.error(e);
        }
    }, [])

    useEffect(() => {
        try {
            refreshVocabulary();
        } catch (e) {
            setError('Failed to refresh vocabulary')
            console.error(e);
        }
    }, [sourceLanguage, targetLanguage]);

    const setLanguages = (source: string, target: string) => {
        setSourceLanguage(source);
        setTargetLanguage(target);
        localStorage.setItem('sourceLanguage', source);
        localStorage.setItem('targetLanguage', target);
    };

    const value = useMemo(
        () => ({
            availableLanguages,
            sourceLanguage,
            targetLanguage,
            vocabulary,
            isLoading, // TO DO: Check usage
            error,
            setLanguages,
        }),
        [sourceLanguage, targetLanguage, vocabulary, isLoading, error]
    );

    return (
        <LanguageContext.Provider value={{
            availableLanguages,
            sourceLanguage,
            targetLanguage,
            vocabulary,
            isLoadingVocabulary,
            setSourceLanguage,
            setTargetLanguage,
            refreshVocabulary,
            setLanguages
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
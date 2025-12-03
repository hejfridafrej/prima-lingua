import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { wordService, type Word, type Translation, translationService, type Language, languageService, type Category, type Class } from './services/api.ts';
import { ApiError, TranslationsNotFoundError, NoMatchingTranslationsError } from './errors.ts';

interface FilterState {
    categories: Category[];
    classes: Class[];
}
interface LanguageContextType {
    availableLanguages: Language[] | null;
    sourceLanguage: string; // TODO: Change to Language?
    targetLanguage: string;
    vocabulary: VocabularyItem[];
    filterState: FilterState;
    isLoadingVocabulary: boolean;
    isLoadingLanguages: boolean;
    error: string | null;
    setSourceLanguage: (lang: string) => void;
    setTargetLanguage: (lang: string) => void;
    refreshVocabulary: () => Promise<void>;
    setLanguages: (source: string, target: string) => void;
    setCategoryFilter: (filter: Category[] | null) => void;
    clearCategoryFilter: () => void;
    setClassFilter: (filter: Class[] | null) => void;
    clearClassFilter: () => void;

}

export interface VocabularyItem extends Word {
    sourceTranslation: Translation;
    targetTranslation: Translation;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [availableLanguages, setAvailableLanguages] = useState<Language[] | null>(null);
    const [sourceLanguage, setSourceLanguage] = useState<string>(
        () => localStorage.getItem('sourceLanguage') || '68e6b3b7db3b5d40c552cae5'
    );
    const [targetLanguage, setTargetLanguage] = useState<string>(
        () => localStorage.getItem('targetLanguage') || '68e6b3b7db3b5d40c552cae7'
    );
    const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
    const [filterState, setFilterState] = useState<FilterState>({ categories: [], classes: [] });
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
    const [isLoadingVocabulary, setIsLoadingVocabulary] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLanguages = async () => {
        setIsLoadingLanguages(true);
        setError(null);
        try {
            let languages = await languageService.getAllLanguages();
            if (languages.length > 0) {
                setAvailableLanguages(languages);
            } else {
                setError('No languages found');
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to fetch languages');
        } finally {
            setIsLoadingLanguages(false);
            setIsInitialized(true);
        }
    }

    const fetchTranslationVocabulary = async () => {
        const sourceLanguageObject = await languageService.getLanguageById(sourceLanguage);
        let sourceVocab = await translationService.getTranslationsByLanguage(sourceLanguageObject._id);
        sourceVocab = sourceVocab.filter((vocabularyItem) => vocabularyItem.translation);

        const targetLanguageObject = await languageService.getLanguageById(targetLanguage);
        let targetVocab = await translationService.getTranslationsByLanguage(targetLanguageObject._id);
        targetVocab = targetVocab.filter((vocabularyItem) => vocabularyItem.translation);
        return { source: sourceVocab, target: targetVocab }
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
        const vocabulary = paired.filter((item): item is VocabularyItem => item !== null);
        if (vocabulary.length === 0) {
            throw new NoMatchingTranslationsError(sourceLanguage, targetLanguage);
        }
        return vocabulary;
    }

    const refreshVocabulary = async () => {
        if (!sourceLanguage || !targetLanguage) {
            return;
        }
        if (sourceLanguage === targetLanguage) {
            setError('Source and target languages must be different');
            return;
        }
        setIsLoadingVocabulary(true);
        setError(null);
        try {
            const result = await fetchTranslationVocabulary()
            if (!result) {
                return;
            }
            const { source, target } = result;
            const vocab = await createVocabulary(source, target);
            setVocabulary(vocab);
        } catch (err: any) {
            if (err instanceof TranslationsNotFoundError || err instanceof NoMatchingTranslationsError || err instanceof ApiError) {
                setError(err.message);
            } else {
                setError(err instanceof Error ? err.message : 'Failed to load vocabulary');
            }
            console.error('Vocabulary loading error:', err);
        } finally {
            setIsLoadingVocabulary(false);
        }
    }

    useEffect(() => {
        fetchLanguages();
    }, []);


    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        if (!sourceLanguage || !targetLanguage) {
            setVocabulary([]);
            return;
        }
        refreshVocabulary();
    }, [sourceLanguage, targetLanguage, isInitialized]);

    const setLanguages = (source: string, target: string) => {
        setSourceLanguage(source);
        setTargetLanguage(target);
        localStorage.setItem('sourceLanguage', source);
        localStorage.setItem('targetLanguage', target);
    };

    const setCategoryFilter = (category: Category[] | null) => {
        if (!category) {
            setFilterState(prev => ({ ...prev, categories: [] }));
            return;
        }

        setFilterState(prev => {
            return {
                ...prev, categories: category
            };
        });
    };

    const clearCategoryFilter = () => {
        setFilterState(prev => ({ ...prev, categories: [] }));
    };

    const setClassFilter = (classItems: Class[] | null) => {
        if (!classItems) {
            setFilterState(prev => ({ ...prev, classes: [] }));
            return;
        }

        setFilterState(prev => {
            return {
                ...prev,
                classes: classItems
            };
        });
    };

    const clearClassFilter = () => {
        setFilterState(prev => ({ ...prev, classes: [] }));
    };

    const value: LanguageContextType = useMemo(
        () => ({
            availableLanguages,
            sourceLanguage,
            targetLanguage,
            vocabulary,
            filterState,
            isLoadingVocabulary,
            isLoadingLanguages,
            error,
            setSourceLanguage,
            setTargetLanguage,
            refreshVocabulary,
            setLanguages,
            setCategoryFilter,
            clearCategoryFilter,
            setClassFilter,
            clearClassFilter
        }), [
        availableLanguages,
        sourceLanguage,
        targetLanguage,
        vocabulary,
        filterState,
        isLoadingVocabulary,
        isLoadingLanguages,
        error
    ]);

    return (
        <LanguageContext.Provider value={value}>
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
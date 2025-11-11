import axios from 'axios';
import { ApiError, TranslationsNotFoundError } from '../errors';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Class {
  _id: string;
  name: string;
  description?: string;
  enabled: boolean;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  enabled: boolean;
}

export interface Word {
  _id: string;
  identifier: string;
  class?: Class | null;
  category?: Category | null;
}

export interface Translation {
  _id: string;
  word_id: Word,
  language: Language,
  translation: string,
}

export interface Language {
  _id: string,
  short_name: string,
  name: string,
  native_name: string,
  enabled: boolean,
}

// API service functions
export const wordService = {
  getAllWords: async (): Promise<Word[]> => {
    const response = await api.get<Word[]>('/words');
    return response.data;
  },

  getWordById: async (word: Word): Promise<Word> => { // TODO: Consider renaming
    const response = await api.get<Word>(`/words/${word}`);
    return response.data;
  },
};

export const translationService = {
  getAllTranslations: async (): Promise<Translation[]> => {
    const response = await api.get<Translation[]>('/translations');
    return response.data;
  },

  getTranslationsByLanguage: async (language: string): Promise<Translation[]> => {
    try {
      const response = await api.get<Translation[]>(`/translations/${language}`); // TO DO: Align language.names to lower case
      const translations = response.data.filter((item: Translation) => item.translation);
      if (translations.length === 0) {
        throw new TranslationsNotFoundError(language);
      }

      return translations;
    } catch (error: any) {
      if (error instanceof TranslationsNotFoundError) {
        throw error;
      }
      throw new ApiError(`Failed to fetch translations for ${language}`);
    }
  }
}

export const languageService = {
  getAllLanguages: async (): Promise<Language[]> => {
    const response = await api.get<Language[]>('/languages');
    return response.data;
  },
  getLanguageById: async (language: string): Promise<Language> => {
    const response = await api.get<Language>(`/languages/${language}`);
    return response.data;
  }
}

export default api;
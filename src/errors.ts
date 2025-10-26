export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export class TranslationsNotFoundError extends Error {
    constructor(languageName: string) {
        super(`No translations found ${languageName}`);
        this.name = 'TranslationsNotFoundError'
    }
}

export class NoMatchingTranslationsError extends Error {
    constructor(sourceLanguage: string, targetLanguage: string) {
        super(`No matching vocabulary found between ${sourceLanguage} and ${targetLanguage}`);
        this.name = 'NoMatchingTranslationsError';
    }
}
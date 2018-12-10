import { SUPPORTED_LANGUAGES } from './constants';
import { strEnum } from './tools';

const SupportedLanguage = strEnum(SUPPORTED_LANGUAGES);

export type SupportedLanguage = keyof typeof SupportedLanguage;

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { languages, resources, type Language, type Translation } from "./translations";

const STORAGE_KEY = "glb.lang";
const DEFAULT_LANGUAGE: Language = "de";

interface I18nValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
}

const fallbackValue: I18nValue = {
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  t: resources[DEFAULT_LANGUAGE],
};

const I18nContext = createContext<I18nValue>(fallbackValue);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  // Read the stored preference after hydration to avoid SSR mismatches.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && languages.includes(stored)) {
      setLangState(stored);
      return;
    }
    const browser = window.navigator.language.slice(0, 2).toLowerCase();
    const match = languages.find((l) => l === browser);
    if (match) setLangState(match);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: resources[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext) ?? fallbackValue;
}

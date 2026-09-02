import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_LANG, DICTIONARIES, LANGS, fill, type Dict, type Lang } from "./translations";

export { LANGS, fill, type Dict, type Lang };

const STORAGE_KEY = "carthea-lang";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dict;
  setLang: (lang: Lang) => void;
  /** Formate un nombre décimal selon la langue (virgule FR/AR, point EN). */
  num: (n: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLang(v: unknown): v is Lang {
  return LANGS.some((l) => l.code === v);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Rendu serveur et première hydratation toujours en FR (langue de référence),
  // puis application de la préférence mémorisée côté client.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) setLangState(saved);
    } catch {
      /* stockage indisponible : on reste en FR */
    }
  }, []);

  const dir = LANGS.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      t: DICTIONARIES[lang],
      setLang,
      num: (n) => (lang === "en" ? String(n) : String(n).replace(".", ",")),
    }),
    [lang, dir, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

/**
 * Synchronise le titre et les descriptions du document avec la langue active.
 * Le head() de la route fournit la version FR au rendu serveur ; ici on
 * applique la version traduite après hydratation ou changement de langue.
 */
export function useDocumentMeta(select: (t: Dict) => { title: string; description: string }) {
  const { t } = useI18n();
  useEffect(() => {
    const { title, description } = select(t);
    document.title = title;
    const set = (selector: string, content: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute("content", content);
    };
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);
}

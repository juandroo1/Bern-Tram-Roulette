import { createContext, useContext, useState, useCallback } from 'react'
import en from './locales/en.json'
import de from './locales/de.json'
import fr from './locales/fr.json'

const LANGS = ['en', 'de', 'fr']
const translations = { en, de, fr }

function detectLang() {
  const saved = localStorage.getItem('btr-lang')
  if (saved && LANGS.includes(saved)) return saved
  const nav = (navigator.language ?? '').toLowerCase()
  if (nav.startsWith('de')) return 'de'
  if (nav.startsWith('fr')) return 'fr'
  return 'en'
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function interpolate(str, vars = {}) {
  if (typeof str !== 'string') return str ?? ''
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  const changeLang = useCallback((l) => {
    if (!LANGS.includes(l)) return
    localStorage.setItem('btr-lang', l)
    setLang(l)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used inside LanguageProvider')
  const { lang, changeLang } = ctx

  /** Translate a dot-path key with optional interpolation vars */
  const t = useCallback(
    (key, vars) => {
      const val = resolvePath(translations[lang], key) ?? resolvePath(translations.en, key) ?? key
      return interpolate(val, vars)
    },
    [lang]
  )

  /** Resolve a multilingual object { en, de, fr } to the current language string */
  const tObj = useCallback(
    (obj) => {
      if (!obj || typeof obj !== 'object') return String(obj ?? '')
      return obj[lang] ?? obj.en ?? ''
    },
    [lang]
  )

  return { t, tObj, lang, changeLang, langs: LANGS }
}

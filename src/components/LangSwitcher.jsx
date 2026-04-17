import { useTranslation } from '../i18n/index.jsx'

const LABELS = { en: 'EN', de: 'DE', fr: 'FR' }

export default function LangSwitcher({ className = '' }) {
  const { lang, changeLang, langs } = useTranslation()

  return (
    <div className={`flex gap-1 ${className}`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${
            l === lang
              ? 'bg-white text-red-700'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}

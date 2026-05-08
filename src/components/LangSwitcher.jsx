import { useTranslation } from '../i18n/index.jsx'

const LABELS = { en: 'EN', de: 'DE', fr: 'FR' }

export default function LangSwitcher({ className = '' }) {
  const { lang, changeLang, langs } = useTranslation()

  return (
    <div className={`inline-flex rounded-md overflow-hidden ring-1 ring-white/20 ${className}`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-2 h-7 text-[11px] font-black tracking-wider transition-colors ${
            l === lang
              ? 'bg-white text-bm-red'
              : 'bg-white/0 hover:bg-white/15 text-white/85'
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}

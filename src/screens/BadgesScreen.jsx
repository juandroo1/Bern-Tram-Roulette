import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

function formatDate(iso, lang) {
  return new Date(iso).toLocaleDateString(
    lang === 'de' ? 'de-CH' : lang === 'fr' ? 'fr-CH' : 'en-GB',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
}

const TYPE_ICONS = {
  explore: '🔍',
  food: '🍽️',
  photo: '📸',
  social: '💬',
}

export default function BadgesScreen({ badges, onBack, onClear }) {
  const { t, tObj, lang } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      {/* Top bar */}
      <div className="bg-red-700 text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all"
        >
          ←
        </button>
        <span className="font-bold flex-1">{t('badges.header')}</span>
        <LangSwitcher />
        <span className="bg-amber-400 text-red-950 font-black px-3 py-0.5 rounded-full text-sm ml-1">
          {badges.length}
        </span>
      </div>

      <div className="flex-1 overflow-auto px-4 py-5">
        {badges.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <div className="text-6xl">🏅</div>
            <p className="text-gray-700 text-lg font-bold">{t('badges.empty')}</p>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{t('badges.emptyHint')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...badges].reverse().map((badge) => (
              <div
                key={`${badge.stopId}-${badge.challengeId}-${badge.earnedAt}`}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                  {badge.stopEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {t('badges.tramLabel', { line: badge.tramLine })}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{badge.stopName}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm leading-snug">
                    {TYPE_ICONS[badge.challengeType] ?? '🎯'}{' '}
                    {typeof badge.challengeTitle === 'object'
                      ? tObj(badge.challengeTitle)
                      : badge.challengeTitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(badge.earnedAt, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {badges.length > 0 && (
        <div className="px-4 pb-10 pt-2">
          <button
            onClick={onClear}
            className="w-full bg-white hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-gray-600 font-medium py-3 rounded-2xl border border-gray-200 text-sm"
          >
            {t('badges.clear')}
          </button>
        </div>
      )}
    </div>
  )
}

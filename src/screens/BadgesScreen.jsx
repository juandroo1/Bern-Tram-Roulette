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
  const { t, lang } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white text-xl">←</button>
        <span className="font-semibold flex-1">{t('badges.header')}</span>
        <LangSwitcher />
        <span className="bg-yellow-400 text-red-800 font-bold px-3 py-0.5 rounded-full text-sm ml-1">
          {badges.length}
        </span>
      </div>

      <div className="flex-1 overflow-auto px-5 py-6">
        {badges.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <div className="text-6xl">🏅</div>
            <p className="text-gray-500 text-lg font-medium">{t('badges.empty')}</p>
            <p className="text-gray-400 text-sm max-w-xs">{t('badges.emptyHint')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...badges].reverse().map((badge) => (
              <div
                key={`${badge.stopId}-${badge.challengeId}-${badge.earnedAt}`}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {badge.stopEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {t('badges.tramLabel', { line: badge.tramLine })}
                    </span>
                    <span className="text-xs text-gray-400">{badge.stopName}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mt-1">
                    {TYPE_ICONS[badge.challengeType] ?? '🎯'}{' '}
                    {typeof badge.challengeTitle === 'object'
                      ? tObj(badge.challengeTitle)
                      : badge.challengeTitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(badge.earnedAt, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {badges.length > 0 && (
        <div className="px-5 pb-8 pt-2">
          <button
            onClick={onClear}
            className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-500 font-medium py-3 rounded-2xl text-sm"
          >
            {t('badges.clear')}
          </button>
        </div>
      )}
    </div>
  )
}

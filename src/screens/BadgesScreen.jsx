import { useState } from 'react'
import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import challengesData from '../data/challenges.json'

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

const DIFFICULTY_COLORS = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
}

function findChallenge(stopId, challengeId) {
  const dest = challengesData.find((d) => d.id === stopId)
  return dest?.challenges.find((c) => c.id === challengeId) ?? null
}

function BadgeDetailView({ badge, onBack }) {
  const { t, tObj, lang } = useTranslation()
  const challenge = findChallenge(badge.stopId, badge.challengeId)

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
        <span className="font-bold flex-1 truncate">{badge.stopName}</span>
        <LangSwitcher />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Destination summary — dark card */}
        <div className="bg-gray-950 text-white rounded-2xl px-5 py-4 flex items-center gap-4">
          <span className="text-3xl flex-shrink-0">{badge.stopEmoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-gray-950 font-black px-2.5 py-1 rounded-lg text-sm">
                {t('badges.tramLabel', { line: badge.tramLine })}
              </span>
              <span className="text-white font-bold truncate">{badge.stopName}</span>
            </div>
            <p className="text-white/40 text-xs">
              {t('badges.earnedOn')} {formatDate(badge.earnedAt, lang)}
            </p>
          </div>
        </div>

        {/* Challenge detail card */}
        {challenge ? (
          <div className="bg-white rounded-2xl p-5 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-3xl">{TYPE_ICONS[challenge.type] ?? '🎯'}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DIFFICULTY_COLORS[challenge.difficulty] ?? 'bg-gray-100 text-gray-600'}`}>
                {t(`difficulty.${challenge.difficulty}`)}
              </span>
              <span className="text-xs font-semibold text-gray-400 capitalize">
                {t(`type.${challenge.type}`)}
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
              {tObj(challenge.title)}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed flex-1">
              {tObj(challenge.description)}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400 text-sm text-center">
            {/* Challenge data no longer available (e.g. removed from curated list) */}
            {tObj({ en: 'Challenge details no longer available.', de: 'Challenge-Details nicht mehr verfügbar.', fr: 'Détails du défi non disponibles.' })}
          </div>
        )}
      </div>

      <div className="px-4 pb-10 pt-2">
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-gray-50 active:scale-95 transition-all text-gray-600 font-semibold py-3 rounded-2xl border border-gray-200"
        >
          {t('badges.backToList')}
        </button>
      </div>
    </div>
  )
}

export default function BadgesScreen({ badges, onBack, onClear }) {
  const { t, tObj, lang } = useTranslation()
  const [selectedBadge, setSelectedBadge] = useState(null)

  if (selectedBadge) {
    return <BadgeDetailView badge={selectedBadge} onBack={() => setSelectedBadge(null)} />
  }

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
              <button
                key={`${badge.stopId}-${badge.challengeId}-${badge.earnedAt}`}
                onClick={() => setSelectedBadge(badge)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4 text-left w-full hover:bg-gray-50 active:scale-[0.98] transition-all"
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
                <span className="text-gray-300 text-lg self-center flex-shrink-0">›</span>
              </button>
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

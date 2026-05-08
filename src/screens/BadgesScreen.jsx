import { useState } from 'react'
import { useTranslation } from '../i18n/index.jsx'
import TopBar from '../components/TopBar.jsx'
import LineBadge from '../components/LineBadge.jsx'
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

const DIFFICULTY_STYLES = {
  easy:   'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  hard:   'bg-red-50 text-bm-red ring-red-200',
}

function findChallenge(stopId, challengeId) {
  const dest = challengesData.find((d) => d.id === stopId)
  return dest?.challenges.find((c) => c.id === challengeId) ?? null
}

function BadgeDetailView({ badge, onBack }) {
  const { t, tObj, lang } = useTranslation()
  const challenge = findChallenge(badge.stopId, badge.challengeId)

  return (
    <div className="flex flex-col min-h-screen bg-bm-mist">
      <TopBar title={badge.stopName} onBack={onBack} />

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Trip recap */}
        <div className="bg-bm-ink text-white rounded-xl px-4 py-3 flex items-center gap-3 shadow ring-1 ring-black/30">
          <LineBadge line={badge.tramLine} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-[10px] font-black tracking-[0.25em] uppercase mb-0.5">
              {t('badges.earnedOn')}
            </p>
            <p className="font-black text-white truncate">{badge.stopName}</p>
            <p className="text-white/55 text-[11px] mt-0.5">{formatDate(badge.earnedAt, lang)}</p>
          </div>
          <span className="text-3xl flex-shrink-0" aria-hidden="true">{badge.stopEmoji}</span>
        </div>

        {/* Challenge detail */}
        {challenge ? (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-bm-line flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-3xl" aria-hidden="true">{TYPE_ICONS[challenge.type] ?? '🎯'}</span>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ring-1 ${DIFFICULTY_STYLES[challenge.difficulty] ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`}>
                {t(`difficulty.${challenge.difficulty}`)}
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-bm-ink/40">
                {t(`type.${challenge.type}`)}
              </span>
            </div>
            <h2 className="text-2xl font-black text-bm-ink mb-3 leading-tight">
              {tObj(challenge.title)}
            </h2>
            <p className="text-bm-ink/60 text-base leading-relaxed flex-1">
              {tObj(challenge.description)}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-bm-line text-bm-ink/50 text-sm text-center">
            {tObj({ en: 'Challenge details no longer available.', de: 'Challenge-Details nicht mehr verfügbar.', fr: 'Détails du défi non disponibles.' })}
          </div>
        )}
      </div>

      <div className="px-4 pb-10 pt-2 bg-bm-mist">
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink/70 font-bold py-3 rounded-xl border border-bm-line"
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
  const [confirmClear, setConfirmClear] = useState(false)

  if (selectedBadge) {
    return <BadgeDetailView badge={selectedBadge} onBack={() => setSelectedBadge(null)} />
  }

  const countChip = (
    <span className="bg-white text-bm-red font-black px-2.5 h-7 rounded-md text-xs tabular-nums inline-flex items-center">
      {badges.length}
    </span>
  )

  return (
    <div className="flex flex-col min-h-screen bg-bm-mist">
      <TopBar title={t('badges.header')} onBack={onBack} rightSlot={countChip} />

      <div className="flex-1 overflow-auto px-4 py-5">
        {badges.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <div className="text-6xl">🏅</div>
            <p className="text-bm-ink text-lg font-black">{t('badges.empty')}</p>
            <p className="text-bm-ink/55 text-sm max-w-xs leading-relaxed">{t('badges.emptyHint')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...badges].reverse().map((badge) => (
              <button
                key={`${badge.stopId}-${badge.challengeId}-${badge.earnedAt}`}
                onClick={() => setSelectedBadge(badge)}
                className="bg-white rounded-xl p-3.5 shadow-sm border border-bm-line flex items-center gap-3 text-left w-full hover:border-bm-red/30 hover:shadow active:scale-[0.99] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-bm-mist flex items-center justify-center text-2xl flex-shrink-0">
                  {badge.stopEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <LineBadge line={badge.tramLine} size="sm" />
                    <span className="text-[11px] text-bm-ink/55 font-bold truncate">{badge.stopName}</span>
                  </div>
                  <p className="font-black text-bm-ink text-sm leading-snug truncate">
                    {TYPE_ICONS[badge.challengeType] ?? '🎯'}{' '}
                    {typeof badge.challengeTitle === 'object'
                      ? tObj(badge.challengeTitle)
                      : badge.challengeTitle}
                  </p>
                  <p className="text-[11px] text-bm-ink/40 mt-0.5">{formatDate(badge.earnedAt, lang)}</p>
                </div>
                <span className="text-bm-ink/30 text-lg self-center flex-shrink-0">›</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {badges.length > 0 && (
        <div className="px-4 pb-10 pt-2 bg-bm-mist">
          {confirmClear ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-bm-red font-black text-sm text-center">{t('badges.clearConfirm')}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { onClear(); setConfirmClear(false) }}
                  className="flex-1 bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black py-2.5 rounded-md text-sm uppercase tracking-wide"
                >
                  {t('badges.clearYes')}
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="flex-1 bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink/70 font-bold py-2.5 rounded-md border border-bm-line text-sm"
                >
                  {t('badges.clearNo')}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="w-full bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink/45 hover:text-bm-ink/70 font-medium py-3 rounded-xl border border-bm-line text-sm"
            >
              {t('badges.clear')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

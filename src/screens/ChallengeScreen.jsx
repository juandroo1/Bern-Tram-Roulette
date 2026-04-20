import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

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

export default function ChallengeScreen({ destination, challenge, nextDeparture, alreadyEarned, onComplete, onBack }) {
  const departure = nextDeparture
  const { t, tObj } = useTranslation()

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
        <span className="font-bold flex-1">{t('challenge.header')}</span>
        <LangSwitcher />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Destination reminder — dark card */}
        <div className="bg-gray-950 text-white rounded-2xl px-5 py-4 flex items-center gap-4">
          <span className="text-3xl flex-shrink-0">{destination.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{t('challenge.headingTo')}</p>
            <p className="font-bold text-white truncate">
              {t('destination.tramLabel', { line: departure.line })} → {destination.stop}
            </p>
            <p className="text-amber-400 text-xs font-semibold mt-0.5">
              {departure.minutesUntil < 1
                ? t('challenge.now')
                : t('challenge.min', { n: departure.minutesUntil })}
              {' · '}{t('challenge.departTime', { time: departure.time })}
            </p>
          </div>
        </div>

        {/* Challenge card */}
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

        {alreadyEarned && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-center">
            <p className="text-amber-700 font-bold">🏅 {t('challenge.alreadyEarned')}</p>
            <p className="text-amber-600 text-sm mt-0.5">{t('challenge.alreadyEarnedSub')}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-10 pt-2 flex flex-col gap-3">
        <button
          onClick={onComplete}
          className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all text-red-950 font-black py-4 rounded-2xl shadow-lg text-lg"
        >
          {alreadyEarned ? t('challenge.completeAgain') : t('challenge.complete')}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-gray-50 active:scale-95 transition-all text-gray-600 font-semibold py-3 rounded-2xl border border-gray-200"
        >
          {t('challenge.back')}
        </button>
      </div>
    </div>
  )
}

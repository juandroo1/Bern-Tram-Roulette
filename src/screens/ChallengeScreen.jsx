import { useTranslation } from '../i18n/index.jsx'
import TopBar from '../components/TopBar.jsx'
import LineBadge from '../components/LineBadge.jsx'

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

export default function ChallengeScreen({ destination, challenge, nextDeparture, alreadyEarned, onComplete, onBack }) {
  const departure = nextDeparture
  const { t, tObj } = useTranslation()

  return (
    <div className="flex flex-col h-full bg-bm-mist">
      <TopBar title={t('challenge.header')} onBack={onBack} />

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Trip recap — small departure board strip */}
        <div className="bg-bm-ink text-white rounded-xl px-4 py-3 flex items-center gap-3 shadow ring-1 ring-black/30">
          <LineBadge line={departure.line} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-[10px] font-black tracking-[0.25em] uppercase mb-0.5">
              {t('challenge.headingTo')}
            </p>
            <p className="font-black text-white truncate">{destination.stop}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-bm-amber font-mono font-black tabular-nums text-lg leading-none">
              {departure.time}
            </p>
            <p className="text-white/55 text-[10px] tracking-wide uppercase mt-0.5">
              {departure.minutesUntil < 1 ? t('challenge.now') : t('challenge.min', { n: departure.minutesUntil })}
            </p>
          </div>
        </div>

        {/* Challenge card — clean Swiss layout */}
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

        {alreadyEarned && (
          <div className="bg-bm-amber/10 border border-bm-amber/40 rounded-xl px-4 py-3 text-center">
            <p className="text-bm-ink font-black text-sm">🏅 {t('challenge.alreadyEarned')}</p>
            <p className="text-bm-ink/60 text-xs mt-0.5">{t('challenge.alreadyEarnedSub')}</p>
          </div>
        )}
      </div>

      {/* Actions — bottom padding clears the iOS home indicator */}
      <div className="px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-2 flex flex-col gap-3 bg-bm-mist">
        <button
          onClick={onComplete}
          className="w-full bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black py-4 rounded-xl shadow-md text-base uppercase tracking-wide"
        >
          {alreadyEarned ? t('challenge.completeAgain') : t('challenge.complete')}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink/70 font-bold py-3 rounded-xl border border-bm-line"
        >
          {t('challenge.back')}
        </button>
      </div>
    </div>
  )
}

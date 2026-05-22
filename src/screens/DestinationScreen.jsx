import { useTranslation } from '../i18n/index.jsx'
import TopBar from '../components/TopBar.jsx'
import LineBadge from '../components/LineBadge.jsx'

function DepartureRow({ dep, isFirst, t }) {
  return (
    <div className={`flex items-center gap-3 py-3 ${!isFirst ? 'border-t border-white/10' : ''}`}>
      <LineBadge line={dep.line} size={isFirst ? 'md' : 'sm'} />

      <div className={`flex-1 min-w-0 ${isFirst ? '' : 'opacity-60'}`}>
        <p className={`font-bold truncate ${isFirst ? 'text-white text-sm' : 'text-white/85 text-xs'}`}>
          {dep.to}
        </p>
        {dep.platform && (
          <p className="text-white/40 text-[10px] tracking-wide uppercase mt-0.5">
            {t('destination.platform', { p: dep.platform })}
          </p>
        )}
      </div>

      <div className={`flex flex-col items-end ${isFirst ? '' : 'opacity-60'}`}>
        <span className={`tabular-nums font-mono font-black ${isFirst ? 'text-bm-amber text-2xl' : 'text-white/85 text-base'}`}>
          {dep.time}
        </span>
        <span className={`tabular-nums text-[10px] font-bold tracking-wide ${dep.delay > 0 ? 'text-orange-400' : 'text-white/45'}`}>
          {dep.delay > 0 ? `+${dep.delay}'  ·  ` : ''}
          {dep.minutesUntil < 1
            ? t('destination.now').toUpperCase()
            : t('destination.min', { n: dep.minutesUntil }).toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default function DestinationScreen({ destination, departures, onAccept, onRespin, onBack }) {
  const { t, tObj } = useTranslation()
  const next = departures[0]

  return (
    <div className="flex flex-col h-full bg-bm-mist">
      <TopBar title={t('destination.header')} onBack={onBack} />

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Departure board — real-Bernmobil-style */}
        <div className="bg-bm-ink rounded-xl overflow-hidden shadow-xl ring-1 ring-black/30 animate-flip-in">
          {/* Board header — like the real LED top strip */}
          <div className="bg-bm-ink-soft px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bm-amber animate-pulse" />
              <p className="text-bm-amber text-[10px] font-black tracking-[0.25em] uppercase">
                {t('destination.live')}
              </p>
            </div>
            <p className="text-white/35 text-[10px] font-mono tabular-nums">
              {t('destination.nextDepartures').toUpperCase()}
            </p>
          </div>

          {/* Headline row — your tram, your destination */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <LineBadge line={next.line} size="xl" />
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-[10px] font-black tracking-[0.25em] uppercase mb-0.5">
                  {t('destination.direction')}
                </p>
                <p className="text-white font-black text-xl leading-tight truncate">
                  {tObj(destination.neighborhood)}
                </p>
              </div>
              <span className="text-3xl flex-shrink-0" aria-hidden="true">{destination.emoji}</span>
            </div>

            {/* Hero time */}
            <div className="flex items-end justify-between border-t border-white/10 pt-3">
              <div>
                <p className="text-white/40 text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                  {t('destination.departs')}
                </p>
                <p className="text-bm-amber font-mono font-black text-4xl tabular-nums leading-none">
                  {next.time}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-black text-2xl tabular-nums ${next.delay > 0 ? 'text-orange-400' : 'text-white'}`}>
                  {next.minutesUntil < 1 ? t('destination.now') : t('destination.min', { n: next.minutesUntil })}
                </p>
                {next.delay > 0 && (
                  <p className="text-orange-400 text-[11px] font-bold tabular-nums">+{next.delay}'</p>
                )}
                {next.platform && (
                  <p className="text-white/45 text-[10px] tracking-wide uppercase mt-0.5">
                    {t('destination.platform', { p: next.platform })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Following departures */}
          {departures.length > 1 && (
            <div className="bg-black/30 px-5 py-2">
              <p className="text-white/30 text-[10px] font-black tracking-[0.25em] uppercase pt-1 pb-1">
                {t('destination.following')}
              </p>
              {departures.slice(1).map((dep) => (
                <DepartureRow key={`${dep.line}-${dep.time}`} dep={dep} isFirst={false} t={t} />
              ))}
            </div>
          )}
        </div>

        {/* Neighborhood card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-bm-red">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase text-bm-red mb-1">
            {destination.stop}
          </p>
          <p className="text-bm-ink/70 text-sm leading-relaxed">{tObj(destination.description)}</p>
        </div>

        <p className="text-center text-bm-ink/40 text-[11px] px-4">{t('destination.credit')}</p>
      </div>

      {/* Actions — bottom padding clears the iOS home indicator */}
      <div className="px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-2 flex flex-col gap-3 bg-bm-mist">
        <button
          onClick={onAccept}
          className="w-full bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black py-4 rounded-xl shadow-md text-base uppercase tracking-wide"
        >
          {t('destination.accept')}
        </button>
        <button
          onClick={onRespin}
          className="w-full bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink/70 font-bold py-3 rounded-xl border border-bm-line"
        >
          {t('destination.respin')}
        </button>
      </div>
    </div>
  )
}

import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

function DepartureRow({ dep, isFirst, t }) {
  return (
    <div className={`flex items-center justify-between py-3 ${!isFirst ? 'border-t border-white/10 opacity-55' : ''}`}>
      <div className="flex items-center gap-3">
        <span className="bg-amber-400 text-gray-950 font-black w-9 h-9 rounded-lg flex items-center justify-center text-sm tabular-nums shadow-sm">
          {dep.line}
        </span>
        {dep.delay > 0 && (
          <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-1.5 py-0.5 rounded">
            +{dep.delay}'
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className={`tabular-nums text-sm font-semibold ${isFirst ? 'text-amber-400' : 'text-white/40'}`}>
          {dep.minutesUntil < 1 ? t('destination.now') : t('destination.min', { n: dep.minutesUntil })}
        </span>
        <span className={`font-mono font-bold tabular-nums ${isFirst ? 'text-white text-2xl' : 'text-white/60 text-lg'}`}>
          {dep.time}
        </span>
      </div>
    </div>
  )
}

export default function DestinationScreen({ destination, departures, onAccept, onRespin, onBack }) {
  const { t, tObj } = useTranslation()
  const next = departures[0]

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
        <span className="font-bold flex-1">{t('destination.header')}</span>
        <LangSwitcher />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-auto">
        {/* Swiss-style departure board — dark card */}
        <div className="bg-gray-950 text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-2">
                {t('destination.nextDepartures')}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-gray-950 font-black px-2.5 py-1 rounded-lg text-sm">
                  {t('destination.tramLabel', { line: next.line })}
                </span>
                <span className="text-white font-bold text-lg truncate">
                  → {tObj(destination.neighborhood)}
                </span>
              </div>
              {next.platform && (
                <p className="text-white/35 text-xs mt-1">
                  {t('destination.platform', { p: next.platform })}
                </p>
              )}
            </div>
            <span className="text-4xl flex-shrink-0">{destination.emoji}</span>
          </div>

          <div className="px-5 pb-4 border-t border-white/10 pt-1">
            {departures.map((dep, i) => (
              <DepartureRow key={`${dep.line}-${dep.time}`} dep={dep} isFirst={i === 0} t={t} />
            ))}
          </div>
        </div>

        {/* Neighborhood info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-red-600">
          <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
            {destination.stop}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">{tObj(destination.description)}</p>
        </div>

        <p className="text-center text-gray-400 text-xs px-4">{t('destination.credit')}</p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-10 pt-2 flex flex-col gap-3">
        <button
          onClick={onAccept}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-black py-4 rounded-2xl shadow-lg text-lg"
        >
          {t('destination.accept')}
        </button>
        <button
          onClick={onRespin}
          className="w-full bg-white hover:bg-gray-50 active:scale-95 transition-all text-gray-600 font-semibold py-3 rounded-2xl border border-gray-200"
        >
          {t('destination.respin')}
        </button>
      </div>
    </div>
  )
}

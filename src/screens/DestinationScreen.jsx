import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

function DepartureRow({ dep, isFirst, t }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${isFirst ? '' : 'opacity-70'}`}>
      <div className="flex items-center gap-2">
        <span className="bg-yellow-400 text-red-800 font-bold px-2 py-0.5 rounded text-sm tabular-nums min-w-[3rem] text-center">
          {t('destination.tramLabel', { line: dep.line })}
        </span>
        {dep.delay > 0 && (
          <span className="text-orange-300 text-xs font-medium">+{dep.delay}'</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white/70 text-sm tabular-nums">
          {dep.minutesUntil < 1 ? t('destination.now') : t('destination.min', { n: dep.minutesUntil })}
        </span>
        <span className={`font-bold tabular-nums ${isFirst ? 'text-2xl' : 'text-lg'}`}>
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
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white text-xl">←</button>
        <span className="font-semibold flex-1">{t('destination.header')}</span>
        <LangSwitcher />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-5 py-6 overflow-auto">
        {/* Tram card with all departures */}
        <div className="bg-red-600 text-white rounded-2xl p-5 shadow">
          {/* Destination header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs uppercase tracking-wide mb-1">
                {t('destination.nextDepartures')}
              </p>
              <h2 className="text-2xl font-bold">→ {next.to}</h2>
              {next.platform && (
                <p className="text-white/60 text-xs mt-0.5">
                  {t('destination.platform', { p: next.platform })}
                </p>
              )}
            </div>
            <div className="text-4xl">{destination.emoji}</div>
          </div>

          {/* Departure rows */}
          <div className="border-t border-white/30 pt-4 flex flex-col gap-3">
            {departures.map((dep, i) => (
              <DepartureRow key={`${dep.line}-${dep.time}`} dep={dep} isFirst={i === 0} t={t} />
            ))}
          </div>
        </div>

        {/* Neighborhood info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            {tObj(destination.neighborhood)}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{destination.stop}</h3>
          <p className="text-gray-500 text-sm">{tObj(destination.description)}</p>
        </div>

        <p className="text-center text-gray-400 text-xs px-4">{t('destination.credit')}</p>
      </div>

      {/* Actions */}
      <div className="px-5 pb-8 pt-2 flex flex-col gap-3">
        <button
          onClick={onAccept}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-bold py-4 rounded-2xl shadow text-lg"
        >
          {t('destination.accept')}
        </button>
        <button
          onClick={onRespin}
          className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-700 font-semibold py-3 rounded-2xl"
        >
          {t('destination.respin')}
        </button>
      </div>
    </div>
  )
}

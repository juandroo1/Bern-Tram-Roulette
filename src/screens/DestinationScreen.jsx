import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

export default function DestinationScreen({ destination, departure, onAccept, onRespin, onBack }) {
  const { t, tObj } = useTranslation()
  const delayText = departure.delay > 0 ? ` (+${departure.delay}')` : ''

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white text-xl">←</button>
        <span className="font-semibold flex-1">{t('destination.header')}</span>
        <LangSwitcher />
      </div>

      <div className="flex-1 flex flex-col gap-4 px-5 py-6 overflow-auto">
        {/* Tram card */}
        <div className="bg-red-600 text-white rounded-2xl p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-yellow-400 text-red-800 font-bold px-2 py-0.5 rounded text-sm">
                  {t('destination.tramLabel', { line: departure.line })}
                </span>
                {departure.delay > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                    +{departure.delay} min
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mt-1">→ {departure.to}</h2>
            </div>
            <div className="text-4xl">{destination.emoji}</div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/30 flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs uppercase tracking-wide">{t('destination.departs')}</p>
              <p className="text-3xl font-bold tabular-nums">
                {departure.time}{delayText}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs uppercase tracking-wide">{t('destination.in')}</p>
              <p className="text-2xl font-bold">
                {departure.minutesUntil < 1
                  ? t('destination.now')
                  : t('destination.min', { n: departure.minutesUntil })}
              </p>
            </div>
          </div>
          {departure.platform && (
            <p className="text-white/60 text-xs mt-2">
              {t('destination.platform', { p: departure.platform })}
            </p>
          )}
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

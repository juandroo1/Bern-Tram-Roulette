import { useTranslation } from '../i18n/index.jsx'

export default function LoadingScreen({ status, error, onRetry, onBack }) {
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-950 via-red-800 to-red-700 gap-8 text-white px-6">
        <div className="text-8xl animate-float">🚃</div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl font-bold">{t('loading.rolling')}</p>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full dot-1" />
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full dot-2" />
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full dot-3" />
          </div>
          <p className="text-white/45 text-sm">{t('loading.fetching')}</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 gap-6 px-6 text-center">
        <div className="text-6xl">⚠️</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('loading.errorTitle')}</h2>
          {error && <p className="text-gray-400 text-sm">{error}</p>}
        </div>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-bold px-8 py-3 rounded-2xl shadow"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">
          {t('loading.back')}
        </button>
      </div>
    )
  }

  if (status === 'no_match') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 gap-6 px-6 text-center">
        <div className="text-6xl">😶‍🌫️</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('loading.noMatchTitle')}</h2>
          <p className="text-gray-400 text-sm max-w-xs">{t('loading.noMatchHint')}</p>
        </div>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-bold px-8 py-3 rounded-2xl shadow"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">
          {t('loading.back')}
        </button>
      </div>
    )
  }

  return null
}

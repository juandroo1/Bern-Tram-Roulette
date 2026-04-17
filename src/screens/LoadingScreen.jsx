import { useTranslation } from '../i18n/index.jsx'

export default function LoadingScreen({ status, error, onRetry, onBack }) {
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-600 gap-6 text-white px-6">
        <div className="text-6xl animate-bounce">🚃</div>
        <p className="text-xl font-semibold">{t('loading.rolling')}</p>
        <p className="text-white/70 text-sm">{t('loading.fetching')}</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 px-6 text-center">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900">{t('loading.errorTitle')}</h2>
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">{t('loading.back')}</button>
      </div>
    )
  }

  if (status === 'no_match') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 px-6 text-center">
        <div className="text-5xl">😶</div>
        <h2 className="text-xl font-bold text-gray-900">{t('loading.noMatchTitle')}</h2>
        <p className="text-gray-500 text-sm max-w-xs">{t('loading.noMatchHint')}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">{t('loading.back')}</button>
      </div>
    )
  }

  return null
}

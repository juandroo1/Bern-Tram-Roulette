import { useTranslation } from '../i18n/index.jsx'
import TramIcon from '../components/TramIcon.jsx'
import BernmobilLogo from '../components/BernmobilLogo.jsx'

export default function LoadingScreen({ status, error, onRetry, onBack }) {
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen bg-bm-red text-white">
        {/* Top bar with logo so loading still feels in-brand */}
        <div className="px-4 h-14 flex items-center">
          <BernmobilLogo className="h-6" />
        </div>
        <div className="h-[3px] bg-bm-amber" />

        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
          {/* Tram gliding along a track — like watching one approach */}
          <div className="relative w-full max-w-xs h-32 overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-white/30" />
            </div>
            <div className="absolute inset-0 flex items-center animate-glide">
              <TramIcon className="w-40 mx-auto drop-shadow-2xl" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-bm-amber">
              Live · Bern Bahnhof
            </p>
            <p className="text-2xl font-black uppercase tracking-tight">
              {t('loading.rolling')}
            </p>
            <div className="flex gap-2 mt-1">
              <div className="w-2 h-2 bg-bm-amber rounded-full dot-1" />
              <div className="w-2 h-2 bg-bm-amber rounded-full dot-2" />
              <div className="w-2 h-2 bg-bm-amber rounded-full dot-3" />
            </div>
            <p className="text-white/65 text-sm mt-1">{t('loading.fetching')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bm-mist gap-6 px-6 text-center">
        <div className="text-6xl">⚠️</div>
        <div>
          <h2 className="text-xl font-black text-bm-ink mb-2 uppercase tracking-tight">
            {t('loading.errorTitle')}
          </h2>
          {error && <p className="text-bm-ink/55 text-sm">{error}</p>}
        </div>
        <button
          onClick={onRetry}
          className="bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black px-8 py-3 rounded-xl shadow uppercase tracking-wide"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-bm-ink/50 text-sm underline">
          {t('loading.back')}
        </button>
      </div>
    )
  }

  if (status === 'no_match') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bm-mist gap-6 px-6 text-center">
        <div className="text-6xl">😶‍🌫️</div>
        <div>
          <h2 className="text-xl font-black text-bm-ink mb-2 uppercase tracking-tight">
            {t('loading.noMatchTitle')}
          </h2>
          <p className="text-bm-ink/55 text-sm max-w-xs">{t('loading.noMatchHint')}</p>
        </div>
        <button
          onClick={onRetry}
          className="bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black px-8 py-3 rounded-xl shadow uppercase tracking-wide"
        >
          {t('loading.retry')}
        </button>
        <button onClick={onBack} className="text-bm-ink/50 text-sm underline">
          {t('loading.back')}
        </button>
      </div>
    )
  }

  return null
}

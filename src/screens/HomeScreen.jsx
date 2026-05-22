import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import BernmobilLogo from '../components/BernmobilLogo.jsx'
import TramIcon from '../components/TramIcon.jsx'
import LineBadge from '../components/LineBadge.jsx'

const TRAM_LINES = ['6', '7', '8', '9']
const HERO_LINE = '9'

export default function HomeScreen({ onSpin, onBadges, badgeCount }) {
  const { t } = useTranslation()
  const badgeKey = badgeCount === 1 ? 'home.badges' : 'home.badgesPlural'

  return (
    <div className="relative flex flex-col h-full bg-white text-bm-ink overflow-hidden">
      {/* Top bar — solid Bernmobil red with wordmark.
          The wrapper extends behind the iOS status bar so the camera /
          signal / battery icons sit on red rather than overlapping content. */}
      <div className="bg-bm-red text-white pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <div className="px-4 h-14 flex items-center justify-between">
          <BernmobilLogo className="h-6" />
          <LangSwitcher />
        </div>
        <div className="h-[3px] bg-bm-amber" />
      </div>

      {/* Hero section with subtle Bernmobil-red wash */}
      <div className="relative flex-1 flex flex-col">
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-bm-red to-bm-red-dark pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-8 pb-10 text-white">
          <p className="text-white/75 text-[11px] font-black tracking-[0.35em] uppercase mb-2">
            {t('home.tagline')}
          </p>
          <h1 className="text-[clamp(2rem,9vw,3.25rem)] font-black tracking-tight leading-[0.95] uppercase">
            {t('home.titleLine1')}
          </h1>
          <h1 className="text-[clamp(2rem,9vw,3.25rem)] font-black italic tracking-tight leading-[0.95] uppercase">
            {t('home.titleLine2')}
            <span className="text-bm-amber">.</span>
          </h1>

          <div className="mt-7 -mb-6 animate-float drop-shadow-2xl">
            <TramIcon className="w-56" line={HERO_LINE} />
          </div>
        </div>

        {/* Body card — overlapping the red hero */}
        <div className="relative z-10 -mt-2 mx-4 bg-white rounded-2xl shadow-xl border border-bm-line p-6 flex flex-col items-center text-center">
          <p className="text-bm-ink/75 text-sm leading-relaxed max-w-[320px]">
            {t('home.subtitle')}
          </p>

          {/* Network strip — line badges in Bernmobil-red signage style */}
          <div className="mt-6 w-full">
            <p className="text-[10px] font-black tracking-[0.25em] uppercase text-bm-ink/45 mb-2">
              {t('home.network')}
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {TRAM_LINES.map((line) => (
                <LineBadge key={line} line={line} size="md" />
              ))}
            </div>
            <div className="mt-3 flex items-center w-full gap-1.5 px-2">
              <div className="h-px flex-1 bg-bm-line" />
              <div className="w-1.5 h-1.5 rounded-full bg-bm-line" />
              <div className="h-px flex-1 bg-bm-line" />
              <div className="w-1.5 h-1.5 rounded-full bg-bm-line" />
              <div className="h-px flex-1 bg-bm-line" />
            </div>
          </div>
        </div>

        {/* CTA + badges — bottom padding clears the iOS home indicator */}
        <div className="relative z-10 flex flex-col items-stretch gap-3 px-6 pt-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
          <button
            onClick={onSpin}
            className="relative w-full bg-bm-red hover:bg-bm-red-dark active:scale-[0.98] transition-all text-white font-black text-lg py-4 rounded-xl uppercase tracking-wide shadow-md animate-pulse-ring"
          >
            {t('home.spin')}
          </button>

          <button
            onClick={onBadges}
            className="w-full bg-white hover:bg-bm-mist active:scale-[0.98] transition-all text-bm-ink font-bold py-3 rounded-xl border border-bm-line flex items-center justify-center gap-2"
          >
            <span aria-hidden="true">🏅</span>
            <span>{t(badgeKey, { count: badgeCount })}</span>
          </button>

          <p className="text-bm-ink/40 text-[11px] text-center mt-1 leading-relaxed">
            {t('home.credit')}
          </p>
        </div>
      </div>
    </div>
  )
}

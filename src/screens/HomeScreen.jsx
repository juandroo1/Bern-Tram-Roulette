import { useTranslation } from '../i18n/index.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

// Bern has Lines 6, 7, 8, 9 — Line 3 was retired decades ago
const TRAM_LINES = ['6', '7', '8', '9']

export default function HomeScreen({ onSpin, onBadges, badgeCount }) {
  const { t } = useTranslation()
  const badgeKey = badgeCount === 1 ? 'home.badges' : 'home.badgesPlural'

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-red-950 via-red-800 to-red-700 text-white overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-red-900/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-red-900/50 blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-10 pb-2">
        <LangSwitcher />
        <button
          onClick={onBadges}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 transition-all px-4 py-2 rounded-full text-sm font-semibold border border-white/20"
        >
          <span>🏅</span>
          <span>{t(badgeKey, { count: badgeCount })}</span>
        </button>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-7 px-6 text-center">
        <div className="text-9xl select-none animate-float drop-shadow-2xl">🚃</div>

        <div className="flex flex-col gap-0">
          <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase mb-2">Bern</p>
          <h1 className="text-[clamp(2.5rem,12vw,3.75rem)] font-black tracking-tight leading-none uppercase whitespace-nowrap">
            {t('home.titleLine1')}
          </h1>
          <h1 className="text-[clamp(2.5rem,12vw,3.75rem)] font-black tracking-tight leading-none uppercase text-amber-400 whitespace-nowrap">
            {t('home.titleLine2')}
          </h1>
        </div>

        <p className="text-white/70 text-base max-w-[260px] leading-relaxed">
          {t('home.subtitle')}
        </p>

        {/* Tram line circles */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            {TRAM_LINES.map((line) => (
              <span
                key={line}
                className="w-12 h-12 rounded-full bg-amber-400 text-red-950 font-black text-xl flex items-center justify-center shadow-lg shadow-black/40 border-2 border-amber-300/60"
              >
                {line}
              </span>
            ))}
          </div>
          {/* Decorative track */}
          <div className="flex items-center w-52 gap-1">
            <div className="h-px flex-1 bg-white/25" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="h-px flex-1 bg-white/25" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="h-px flex-1 bg-white/25" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-12">
        <button
          onClick={onSpin}
          className="w-full max-w-sm bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all text-red-950 font-black text-xl py-5 rounded-2xl animate-glow-pulse"
        >
          {t('home.spin')}
        </button>
        <p className="text-white/35 text-xs text-center">{t('home.credit')}</p>
      </div>
    </div>
  )
}

import LangSwitcher from './LangSwitcher.jsx'
import BernmobilLogo from './BernmobilLogo.jsx'

// Bernmobil-style app bar: solid red, white logo/title, optional back button.
export default function TopBar({ title, onBack, rightSlot, showLogo = false }) {
  return (
    <div className="bg-bm-red text-white shadow-sm">
      <div className="px-4 h-14 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 -ml-1 rounded-md bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all text-lg leading-none"
          >
            ←
          </button>
        )}

        {showLogo ? (
          <BernmobilLogo className="h-6 flex-shrink-0" />
        ) : (
          <span className="font-black uppercase tracking-wide text-sm flex-1 truncate">{title}</span>
        )}

        {showLogo && <span className="font-bold text-sm tracking-wide flex-1 truncate ml-1 opacity-90">{title}</span>}

        <div className="flex items-center gap-2">
          {rightSlot}
          <LangSwitcher />
        </div>
      </div>

      {/* Bernmobil signature stripe — yellow accent below the bar */}
      <div className="h-[3px] bg-bm-amber" />
    </div>
  )
}

import LangSwitcher from './LangSwitcher.jsx'
import BernmobilLogo from './BernmobilLogo.jsx'

// Bernmobil-style app bar: solid red, white logo/title, optional back button.
//
// The outer wrapper extends the red panel into the iOS status-bar / Dynamic
// Island area via `env(safe-area-inset-*)`. The interactive row sits below
// that, so the title and the back button never collide with the camera or
// signal/battery icons. Horizontal insets handle landscape on notched iPhones.
export default function TopBar({ title, onBack, rightSlot, showLogo = false }) {
  return (
    <div className="bg-bm-red text-white shadow-sm pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="px-3 h-14 flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-11 h-11 rounded-md bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all text-xl leading-none flex-shrink-0"
          >
            ←
          </button>
        )}

        {showLogo ? (
          <BernmobilLogo className="h-6 flex-shrink-0 ml-1" />
        ) : (
          <span className="font-black uppercase tracking-wide text-sm flex-1 truncate ml-1">{title}</span>
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

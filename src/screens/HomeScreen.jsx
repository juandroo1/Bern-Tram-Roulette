export default function HomeScreen({ onSpin, onBadges, badgeCount }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 bg-gradient-to-b from-red-600 to-red-800 text-white">
      {/* Header */}
      <div className="w-full flex justify-end">
        <button
          onClick={onBadges}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-medium"
        >
          <span>🏅</span>
          <span>{badgeCount} badge{badgeCount !== 1 ? 's' : ''}</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-7xl mb-2">🚃</div>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          Bern Tram<br />Roulette
        </h1>
        <p className="text-white/80 text-lg max-w-xs">
          Jump on a random tram, explore a new corner of Bern, complete a challenge.
        </p>

        {/* Tram lines decoration */}
        <div className="flex gap-2 mt-2">
          {['3', '6', '7', '8', '9'].map((line) => (
            <span
              key={line}
              className="w-9 h-9 rounded-full bg-yellow-400 text-red-800 font-bold text-sm flex items-center justify-center shadow"
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Spin button */}
      <div className="w-full flex flex-col items-center gap-4">
        <button
          onClick={onSpin}
          className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all text-red-800 font-bold text-xl py-5 rounded-2xl shadow-lg"
        >
          Spin the Roulette!
        </button>
        <p className="text-white/60 text-xs">Uses live tram data from transport.opendata.ch</p>
      </div>
    </div>
  )
}

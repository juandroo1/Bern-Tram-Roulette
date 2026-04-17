const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
}

const TYPE_ICONS = {
  explore: '🔍',
  food: '🍽️',
  photo: '📸',
  social: '💬',
}

export default function ChallengeScreen({ destination, challenge, departure, alreadyEarned, onComplete, onBack }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white text-xl">←</button>
        <span className="font-semibold">Your Challenge</span>
      </div>

      <div className="flex-1 flex flex-col gap-4 px-5 py-6 overflow-auto">
        {/* Destination reminder */}
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">{destination.emoji}</span>
          <div>
            <p className="text-xs text-red-400 font-medium">Heading to</p>
            <p className="font-semibold text-red-800">
              Tram {departure.line} → {destination.stop}
            </p>
            <p className="text-xs text-red-500">
              Departs {departure.time} · {departure.minutesUntil < 1 ? 'now!' : `${departure.minutesUntil} min`}
            </p>
          </div>
        </div>

        {/* Challenge card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{TYPE_ICONS[challenge.type] ?? '🎯'}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
              {challenge.difficulty}
            </span>
            <span className="text-xs text-gray-400 capitalize">{challenge.type}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">{challenge.title}</h2>
          <p className="text-gray-600 text-base leading-relaxed">{challenge.description}</p>
        </div>

        {alreadyEarned && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-center">
            <p className="text-yellow-700 font-semibold">🏅 You've done this one before!</p>
            <p className="text-yellow-600 text-sm">Complete it again to re-earn the badge.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-8 pt-2 flex flex-col gap-3">
        <button
          onClick={onComplete}
          className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all text-red-800 font-bold py-4 rounded-2xl shadow text-lg"
        >
          {alreadyEarned ? 'Complete Again 🔁' : 'Challenge Complete! 🏅'}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-700 font-semibold py-3 rounded-2xl"
        >
          Back to Destination
        </button>
      </div>
    </div>
  )
}

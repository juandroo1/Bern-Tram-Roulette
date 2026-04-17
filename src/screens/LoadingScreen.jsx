export default function LoadingScreen({ status, error, onRetry, onBack }) {
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-600 gap-6 text-white px-6">
        <div className="text-6xl animate-bounce">🚃</div>
        <p className="text-xl font-semibold">Rolling the dice…</p>
        <p className="text-white/70 text-sm">Fetching live tram departures</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 px-6 text-center">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900">Could not load departures</h2>
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">Go back</button>
      </div>
    )
  }

  if (status === 'no_match') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 px-6 text-center">
        <div className="text-5xl">😶</div>
        <h2 className="text-xl font-bold text-gray-900">No trams found right now</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          None of our curated tram lines had upcoming departures. Try again in a few minutes!
        </p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
        <button onClick={onBack} className="text-gray-400 text-sm underline">Go back</button>
      </div>
    )
  }

  return null
}

import { useState } from 'react'
import { useTramDeparture } from './hooks/useTramDeparture'
import { useBadges } from './hooks/useBadges'
import HomeScreen from './screens/HomeScreen'
import DestinationScreen from './screens/DestinationScreen'
import ChallengeScreen from './screens/ChallengeScreen'
import BadgesScreen from './screens/BadgesScreen'
import LoadingScreen from './screens/LoadingScreen'

// Screens: home | loading | destination | challenge | badges
export default function App() {
  const [screen, setScreen] = useState('home')
  const { status, destination, departures, challenge, error, spin, respin } = useTramDeparture()
  const { badges, earnBadge, hasBadge, clearBadges } = useBadges()

  function handleSpin() {
    setScreen('loading')
    spin()
  }

  // Navigate to destination once loaded
  if (screen === 'loading' && status === 'success') {
    setScreen('destination')
  }

  function handleRespin() {
    setScreen('loading')
    respin()
  }

  function handleAcceptChallenge() {
    setScreen('challenge')
  }

  function handleCompleteChallenge() {
    if (destination && challenge) {
      earnBadge(destination, challenge)
    }
    setScreen('home')
  }

  function handleBack() {
    if (screen === 'challenge') setScreen('destination')
    else if (screen === 'destination') setScreen('home')
    else if (screen === 'badges') setScreen('home')
    else if (screen === 'loading') setScreen('home')
  }

  const alreadyEarned = destination && challenge ? hasBadge(destination.id, challenge.id) : false

  return (
    <div className="max-w-md mx-auto h-dvh overflow-hidden">
      {screen === 'home' && (
        <HomeScreen onSpin={handleSpin} onBadges={() => setScreen('badges')} badgeCount={badges.length} />
      )}

      {screen === 'loading' && (status === 'loading' || status === 'error' || status === 'no_match') && (
        <LoadingScreen
          status={status}
          error={error}
          onRetry={handleRespin}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'destination' && destination && departures && (
        <DestinationScreen
          destination={destination}
          departures={departures}
          onAccept={handleAcceptChallenge}
          onRespin={handleRespin}
          onBack={handleBack}
        />
      )}

      {screen === 'challenge' && destination && departures && challenge && (
        <ChallengeScreen
          destination={destination}
          challenge={challenge}
          nextDeparture={departures[0]}
          alreadyEarned={alreadyEarned}
          onComplete={handleCompleteChallenge}
          onBack={handleBack}
        />
      )}

      {screen === 'badges' && (
        <BadgesScreen
          badges={badges}
          onBack={handleBack}
          onClear={clearBadges}
        />
      )}
    </div>
  )
}

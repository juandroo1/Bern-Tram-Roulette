import { useState, useCallback } from 'react'

const STORAGE_KEY = 'bern-tram-badges'

function loadBadges() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveBadges(badges) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(badges))
}

export function useBadges() {
  const [badges, setBadges] = useState(loadBadges)

  const earnBadge = useCallback((destination, challenge) => {
    setBadges((prev) => {
      const alreadyEarned = prev.some(
        (b) => b.challengeId === challenge.id && b.stopId === destination.id
      )
      if (alreadyEarned) return prev
      const updated = [
        ...prev,
        {
          stopId: destination.id,
          stopName: destination.stop,
          stopEmoji: destination.emoji,
          tramLine: destination.tramLine,
          challengeId: challenge.id,
          challengeTitle: challenge.title,
          challengeType: challenge.type,
          earnedAt: new Date().toISOString(),
        },
      ]
      saveBadges(updated)
      return updated
    })
  }, [])

  const hasBadge = useCallback(
    (stopId, challengeId) => badges.some((b) => b.stopId === stopId && b.challengeId === challengeId),
    [badges]
  )

  const clearBadges = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setBadges([])
  }, [])

  return { badges, earnBadge, hasBadge, clearBadges }
}

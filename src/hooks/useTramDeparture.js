import { useState, useCallback } from 'react'
import challengesData from '../data/challenges.json'

const API_BASE = 'https://transport.opendata.ch/v1'
const STATION_FROM = 'Bern'
const SHOWN_DEPARTURES = 3

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function formatTime(isoString) {
  if (!isoString) return null
  return new Date(isoString).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })
}

function minutesUntil(isoString) {
  if (!isoString) return null
  return Math.max(0, Math.round((new Date(isoString) - new Date()) / 60000))
}

/**
 * Fetch the next direct tram connections from Bern to a specific stop.
 * Returns [] on any error or if no direct trams are running.
 */
async function fetchDirectTrams(stop) {
  try {
    const url =
      `${API_BASE}/connections` +
      `?from=${encodeURIComponent(STATION_FROM)}` +
      `&to=${encodeURIComponent(stop)}` +
      `&transportations[]=tram` +
      `&limit=${SHOWN_DEPARTURES + 3}`
    const res = await fetch(url)
    if (!res.ok) return []
    const { connections = [] } = await res.json()

    return connections
      .filter((c) => (c.transfers ?? 1) === 0) // direct tram only
      .slice(0, SHOWN_DEPARTURES)
      .map((c) => {
        const journey = c.sections?.[0]?.journey ?? {}
        return {
          // journey.name gives the human-readable line number (e.g. "6", "8", "9")
          line: journey.name ?? journey.number ?? '?',
          to: c.to?.station?.name ?? stop,
          time: formatTime(c.from?.departure),
          minutesUntil: minutesUntil(c.from?.departure),
          delay: c.from?.delay ?? 0,
          platform: c.from?.platform ?? null,
        }
      })
  } catch {
    return []
  }
}

export function useTramDeparture() {
  const [state, setState] = useState({
    status: 'idle', // idle | loading | success | error | no_match
    destination: null,
    departures: null,
    challenge: null,
    error: null,
  })

  const spin = useCallback(async () => {
    setState({ status: 'loading', destination: null, departures: null, challenge: null, error: null })

    try {
      // Query all curated stops in parallel — each gets its own explicit API call
      // so there's no guessing about which lines stop where.
      const results = await Promise.all(
        challengesData.map(async (dest) => ({
          dest,
          departures: await fetchDirectTrams(dest.stop),
        }))
      )

      const valid = results.filter((r) => r.departures.length > 0)

      if (valid.length === 0) {
        setState({ status: 'no_match', destination: null, departures: null, challenge: null, error: null })
        return
      }

      const { dest, departures } = pickRandom(valid)
      const challenge = pickRandom(dest.challenges)

      setState({ status: 'success', destination: dest, departures, challenge, error: null })
    } catch (err) {
      setState({ status: 'error', destination: null, departures: null, challenge: null, error: err.message })
    }
  }, [])

  const respin = useCallback(() => {
    spin()
  }, [spin])

  return { ...state, spin, respin }
}

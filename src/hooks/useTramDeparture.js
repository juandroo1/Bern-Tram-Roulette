import { useState, useCallback } from 'react'
import challengesData from '../data/challenges.json'

const API_BASE = 'https://transport.opendata.ch/v1'
const BERN_BAHNHOF = 'Bern, Bahnhof'
const STATIONBOARD_LIMIT = 200
const SHOWN_DEPARTURES = 3
const MAX_WAIT_MINUTES = 30

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
 * Fetch the stationboard from Bern Bahnhof once, then match entries against
 * our curated stops using the exact `to` field from the API.
 *
 * Returns an array of { dest, departures } for stops that have at least one
 * tram departing within MAX_WAIT_MINUTES.
 */
async function fetchValidStops() {
  const url =
    `${API_BASE}/stationboard` +
    `?station=${encodeURIComponent(BERN_BAHNHOF)}` +
    `&limit=${STATIONBOARD_LIMIT}` +
    `&transportations[]=tram`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const { stationboard = [] } = await res.json()

  // Build a lookup: stationboardTo → list of departure objects (within window)
  const grouped = new Map()
  for (const entry of stationboard) {
    const mins = minutesUntil(entry.stop?.departure)
    if (mins === null || mins > MAX_WAIT_MINUTES) continue

    const toKey = entry.to
    if (!grouped.has(toKey)) grouped.set(toKey, [])
    grouped.get(toKey).push({
      line: entry.number ?? entry.name ?? '?',
      to: entry.to,
      time: formatTime(entry.stop?.departure),
      minutesUntil: mins,
      delay: entry.stop?.delay ?? 0,
      platform: entry.stop?.platform ?? null,
    })
  }

  // Match grouped departures to curated destinations
  const valid = []
  for (const dest of challengesData) {
    const deps = grouped.get(dest.stationboardTo)
    if (!deps || deps.length === 0) continue
    // Already filtered to ≤30 min; sort by departure time and cap at SHOWN_DEPARTURES
    deps.sort((a, b) => a.minutesUntil - b.minutesUntil)
    valid.push({ dest, departures: deps.slice(0, SHOWN_DEPARTURES) })
  }

  return valid
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
      const valid = await fetchValidStops()

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

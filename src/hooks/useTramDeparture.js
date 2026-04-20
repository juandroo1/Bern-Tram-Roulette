import { useState, useCallback } from 'react'
import challengesData from '../data/challenges.json'

const API_BASE = 'https://transport.opendata.ch/v1'
const BERN_BAHNHOF = 'Bern, Bahnhof'
const STATIONBOARD_LIMIT = 300
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
 * Fetch the Bern Bahnhof stationboard once and match entries to curated stops.
 *
 * Primary key: tram line number.  The `stationboardTo` field in challenges.json
 * is used as a direction filter (so we don't send someone toward Bümpliz when
 * the challenge is for Ostring), but if the exact string doesn't match — due to
 * API variance or short-running services — we fall back to any departure on that
 * line so no line is silently dropped.
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

  // Group upcoming departures (≤ MAX_WAIT_MINUTES) by line number.
  const byLine = new Map() // line → [departure, …]
  for (const entry of stationboard) {
    const mins = minutesUntil(entry.stop?.departure)
    if (mins === null || mins > MAX_WAIT_MINUTES) continue

    const line = String(entry.number ?? entry.name ?? '').trim()
    if (!line) continue

    if (!byLine.has(line)) byLine.set(line, [])
    byLine.get(line).push({
      line,
      to: entry.to ?? '',
      time: formatTime(entry.stop?.departure),
      minutesUntil: mins,
      delay: entry.stop?.delay ?? 0,
      platform: entry.stop?.platform ?? null,
    })
  }

  // For each curated destination, check if its tram line is running.
  const valid = []
  for (const dest of challengesData) {
    const allDepsForLine = byLine.get(String(dest.tramLine)) ?? []
    if (allDepsForLine.length === 0) continue // line not in service right now

    // Prefer departures going to the expected terminal (correct direction).
    // Fall back to all departures on the line if the exact string isn't found —
    // e.g. the API sometimes uses slightly different spellings for short-turns.
    const directed = dest.stationboardTo
      ? allDepsForLine.filter((d) => d.to === dest.stationboardTo)
      : allDepsForLine
    const deps = directed.length > 0 ? directed : allDepsForLine

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

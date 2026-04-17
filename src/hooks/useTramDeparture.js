import { useState, useCallback } from 'react'
import challengesData from '../data/challenges.json'

const STATION = 'Bern, Bahnhof'
const API_BASE = 'https://transport.opendata.ch/v1'
const SHOWN_DEPARTURES = 3

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function formatTime(isoString) {
  if (!isoString) return null
  const date = new Date(isoString)
  return date.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })
}

function minutesUntil(isoString) {
  if (!isoString) return null
  const diff = new Date(isoString) - new Date()
  return Math.max(0, Math.round(diff / 60000))
}

function makeDeparture(entry) {
  const departureTime = entry.stop?.departure ?? null
  return {
    line: entry.number ?? entry.name ?? '?',
    to: entry.to,
    time: formatTime(departureTime),
    minutesUntil: minutesUntil(departureTime),
    delay: entry.stop?.delay ?? 0,
    platform: entry.stop?.platform ?? null,
  }
}

export function useTramDeparture() {
  const [state, setState] = useState({
    status: 'idle', // idle | loading | success | error | no_match
    destination: null,
    departures: null, // array of up to SHOWN_DEPARTURES
    challenge: null,
    error: null,
  })

  const spin = useCallback(async () => {
    setState({ status: 'loading', destination: null, departures: null, challenge: null, error: null })

    try {
      // Fetch enough entries so every curated destination has several upcoming departures.
      // Trams run ~every 7-15 min; 150 entries across all lines gives a comfortable buffer.
      const res = await fetch(
        `${API_BASE}/stationboard?station=${encodeURIComponent(STATION)}&limit=150&transportations[]=tram`
      )
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()

      const board = data.stationboard ?? []

      // Group entries by curated destination id
      const byDest = {}
      for (const entry of board) {
        const dest = (entry.to ?? '').toLowerCase()
        const curated = challengesData.find((c) => dest.includes(c.apiMatch.toLowerCase()))
        if (!curated) continue
        if (!byDest[curated.id]) byDest[curated.id] = { curated, entries: [] }
        byDest[curated.id].entries.push(entry)
      }

      const available = Object.values(byDest)
      if (available.length === 0) {
        setState({ status: 'no_match', destination: null, departures: null, challenge: null, error: null })
        return
      }

      // Pick a random destination, then take its next N departures sorted by time
      const picked = pickRandom(available)
      const departures = picked.entries
        .filter((e) => e.stop?.departure)
        .sort((a, b) => new Date(a.stop.departure) - new Date(b.stop.departure))
        .slice(0, SHOWN_DEPARTURES)
        .map(makeDeparture)

      const challenge = pickRandom(picked.curated.challenges)

      setState({ status: 'success', destination: picked.curated, departures, challenge, error: null })
    } catch (err) {
      setState({ status: 'error', destination: null, departures: null, challenge: null, error: err.message })
    }
  }, [])

  const respin = useCallback(() => {
    spin()
  }, [spin])

  return { ...state, spin, respin }
}

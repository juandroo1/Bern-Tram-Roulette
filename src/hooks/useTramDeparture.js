import { useState, useCallback } from 'react'
import challengesData from '../data/challenges.json'

const STATION = 'Bern, Bahnhof'
const API_BASE = 'https://transport.opendata.ch/v1'

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

export function useTramDeparture() {
  const [state, setState] = useState({
    status: 'idle', // idle | loading | success | error | no_match
    destination: null,
    departure: null,
    challenge: null,
    error: null,
  })

  const spin = useCallback(async () => {
    setState({ status: 'loading', destination: null, departure: null, challenge: null, error: null })

    try {
      const res = await fetch(
        `${API_BASE}/stationboard?station=${encodeURIComponent(STATION)}&limit=80&transportations[]=tram`
      )
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()

      const board = data.stationboard ?? []

      // Filter to trams going to one of our curated stops
      const matched = board.filter((entry) => {
        const dest = (entry.to ?? '').toLowerCase()
        return challengesData.some((c) => dest.includes(c.apiMatch.toLowerCase()))
      })

      if (matched.length === 0) {
        setState({ status: 'no_match', destination: null, departure: null, challenge: null, error: null })
        return
      }

      // Pick a random matching departure
      const picked = pickRandom(matched)
      const destination = challengesData.find((c) =>
        (picked.to ?? '').toLowerCase().includes(c.apiMatch.toLowerCase())
      )

      const departureTime = picked.stop?.departure ?? null
      const delay = picked.stop?.delay ?? 0

      const departure = {
        line: picked.number ?? picked.name ?? '?',
        to: picked.to,
        time: formatTime(departureTime),
        minutesUntil: minutesUntil(departureTime),
        delay,
        platform: picked.stop?.platform ?? null,
      }

      const challenge = pickRandom(destination.challenges)

      setState({ status: 'success', destination, departure, challenge, error: null })
    } catch (err) {
      setState({ status: 'error', destination: null, departure: null, challenge: null, error: err.message })
    }
  }, [])

  const respin = useCallback(() => {
    spin()
  }, [spin])

  return { ...state, spin, respin }
}

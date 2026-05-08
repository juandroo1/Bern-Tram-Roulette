// Bernmobil-inspired wordmark: italic lowercase, motion mark, accent dot.
// Not the real Bernmobil logo — a tribute mark for this fan project.
export default function BernmobilLogo({ className = '', tone = 'light' }) {
  const fg = tone === 'light' ? '#FFFFFF' : 'var(--color-bm-red)'
  const accent = '#FFC400'

  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      role="img"
      aria-label="berntram·roulette"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motion mark — three slanted bars echoing tram-in-motion */}
      <g fill={fg}>
        <rect x="2"  y="10" width="4" height="22" transform="skewX(-14)" />
        <rect x="11" y="10" width="4" height="22" transform="skewX(-14)" opacity="0.7" />
        <rect x="20" y="10" width="4" height="22" transform="skewX(-14)" opacity="0.4" />
      </g>

      {/* Wordmark — italic lowercase "berntram" */}
      <text
        x="34"
        y="29"
        fill={fg}
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="24"
        letterSpacing="-0.5"
      >
        berntram
      </text>

      {/* Accent dot — Bernmobil-style yellow punctuation */}
      <circle cx="156" cy="14" r="3.2" fill={accent} />

      {/* Tagline */}
      <text
        x="162"
        y="29"
        fill={fg}
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontWeight="600"
        fontSize="12"
        letterSpacing="2"
      >
        rlt
      </text>
    </svg>
  )
}

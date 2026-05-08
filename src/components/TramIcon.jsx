// Bernmobil-style articulated tram, side view.
//
// Three-module low-floor design with a streamlined nose, continuous side
// window strip, three doors, two articulation joints, and three bogies.
// White roof line + amber LED destination display follow the typical Bern
// city-tram livery.
export default function TramIcon({ className = '', line = null }) {
  return (
    <svg
      viewBox="0 0 280 160"
      className={className}
      role="img"
      aria-label={line ? `Bern tram, line ${line}` : 'Bern tram'}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Track shadow */}
      <ellipse cx="140" cy="150" rx="124" ry="5" fill="rgba(0,0,0,0.18)" />

      {/* Pantograph: contact bar + Z-shaped arm + base */}
      <rect x="108" y="11" width="56" height="3" rx="1" fill="#0E1116" />
      <g stroke="#0E1116" strokeWidth="2" strokeLinecap="round" fill="none">
        <line x1="124" y1="44" x2="138" y2="22" />
        <line x1="138" y1="22" x2="124" y2="14" />
        <line x1="138" y1="22" x2="156" y2="14" />
      </g>
      <rect x="120" y="42" width="22" height="4" rx="1" fill="#0E1116" />

      {/* Main body — streamlined nose on the left, rounded rear on the right */}
      <path
        d="M 14 70
           C 14 56, 22 44, 38 44
           L 256 44
           Q 268 44, 268 56
           L 268 130
           Q 268 140, 258 140
           L 24 140
           Q 14 140, 14 130 Z"
        fill="var(--color-bm-red)"
      />

      {/* White roof line — Bernmobil livery */}
      <path
        d="M 38 46
           L 263 46
           Q 266 46, 266 49
           L 266 52
           L 22 52
           C 22 50, 28 46, 38 46 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Cab side window (driver) on the nose */}
      <path
        d="M 22 76
           C 22 66, 30 60, 42 60
           L 56 60
           L 56 92
           L 28 92
           Q 22 92, 22 84 Z"
        fill="#0E1116"
      />
      <path d="M 26 70 C 28 66, 34 64, 42 64 L 52 64 L 52 72 Z" fill="#3a4252" opacity="0.7" />

      {/* Passenger window strip — continuous, with thin red mullions */}
      <rect x="62" y="62" width="202" height="30" rx="3" fill="#0E1116" />
      <g fill="var(--color-bm-red)">
        <rect x="96"  y="62" width="2" height="30" />
        <rect x="130" y="62" width="2" height="30" />
        <rect x="164" y="62" width="2" height="30" />
        <rect x="198" y="62" width="2" height="30" />
        <rect x="232" y="62" width="2" height="30" />
      </g>
      {/* Glass reflection */}
      <rect x="62" y="64" width="202" height="11" rx="2" fill="#3a4252" opacity="0.5" />

      {/* Front LED destination display — above the cab window */}
      {line != null && (
        <g>
          <rect x="22" y="53" width="34" height="6" rx="1" fill="#0E1116" />
          <text
            x="39"
            y="58"
            textAnchor="middle"
            fill="var(--color-bm-amber)"
            fontFamily="ui-sans-serif, system-ui, 'Helvetica Neue', sans-serif"
            fontWeight="900"
            fontSize="5.5"
            letterSpacing="0.3"
          >
            {line}  BERN
          </text>
        </g>
      )}

      {/* Headlight cluster at the nose */}
      <rect x="16" y="98" width="10" height="6" rx="1.5" fill="#FFFFFF" opacity="0.92" />
      <circle cx="21" cy="101" r="1.6" fill="var(--color-bm-amber)" />

      {/* Doors — three sliding double-leaf doors */}
      <g>
        {[76, 144, 212].map((x) => (
          <g key={x}>
            <rect x={x} y="56" width="20" height="74" fill="rgba(0,0,0,0.14)" />
            {/* Outer frame */}
            <line x1={x}      y1="56" x2={x}      y2="130" stroke="rgba(0,0,0,0.55)" strokeWidth="0.9" />
            <line x1={x + 20} y1="56" x2={x + 20} y2="130" stroke="rgba(0,0,0,0.55)" strokeWidth="0.9" />
            {/* Center seam (the two leaves meeting) */}
            <line x1={x + 10} y1="92" x2={x + 10} y2="130" stroke="rgba(0,0,0,0.45)" strokeWidth="0.9" />
            {/* Door window indicator */}
            <rect x={x + 2} y="64" width="16" height="22" rx="2" fill="#0E1116" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* Articulation joints — subtle seams between the three modules */}
      <g fill="rgba(0,0,0,0.22)">
        <rect x="118" y="44" width="1.5" height="86" />
        <rect x="186" y="44" width="1.5" height="86" />
      </g>

      {/* Lower skirt — slight darker red */}
      <rect x="14" y="124" width="254" height="6" fill="var(--color-bm-red-deep)" />

      {/* Three bogies (wheel sets), one per module */}
      <g>
        {[44, 140, 236].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy="140" rx="22" ry="5" fill="#0E1116" opacity="0.5" />
            <circle  cx={cx - 8} cy="142" r="6" fill="#0E1116" />
            <circle  cx={cx - 8} cy="142" r="2.2" fill="#3a4252" />
            <circle  cx={cx + 8} cy="142" r="6" fill="#0E1116" />
            <circle  cx={cx + 8} cy="142" r="2.2" fill="#3a4252" />
          </g>
        ))}
      </g>
    </svg>
  )
}

// Stylized Bernmobil-red tram silhouette — front-three-quarter view.
export default function TramIcon({ className = '', line = null }) {
  return (
    <svg
      viewBox="0 0 220 200"
      className={className}
      role="img"
      aria-label={line ? `Tram ${line}` : 'Tram'}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Track shadow */}
      <ellipse cx="110" cy="186" rx="86" ry="6" fill="rgba(0,0,0,0.18)" />

      {/* Body */}
      <g>
        {/* Main body */}
        <rect x="22" y="44" width="176" height="124" rx="22" fill="var(--color-bm-red)" />
        {/* Top strip — accent yellow */}
        <rect x="22" y="44" width="176" height="8" rx="4" fill="var(--color-bm-amber)" />

        {/* Front face — slightly darker */}
        <path
          d="M22 80 Q22 44 56 44 L74 44 L74 168 L40 168 Q22 168 22 150 Z"
          fill="var(--color-bm-red-dark)"
          opacity="0.55"
        />

        {/* Windshield — full-height to match the side windows.
            On real Bernmobil Combinos the dot-matrix destination display
            sits right at the top of the front, so we draw the amber
            line indicator inside the upper portion of the windshield
            and keep the glass-reflection sheen on the lower half. */}
        <rect x="34" y="60" width="40" height="36" rx="6" fill="#0E1116" />
        <rect x="36" y="80" width="36" height="12" rx="3" fill="#3a4252" opacity="0.8" />
        {line != null && (
          <text
            x="54"
            y="73"
            textAnchor="middle"
            fill="var(--color-bm-amber)"
            fontFamily="ui-sans-serif, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontWeight="900"
            fontSize="12"
            letterSpacing="-0.3"
          >
            {line}
          </text>
        )}

        {/* Side windows */}
        <g fill="#0E1116">
          <rect x="86"  y="64" width="28" height="32" rx="4" />
          <rect x="120" y="64" width="28" height="32" rx="4" />
          <rect x="154" y="64" width="34" height="32" rx="4" />
        </g>
        {/* Window sheen */}
        <g fill="#3a4252" opacity="0.7">
          <rect x="88"  y="66" width="24" height="10" rx="2" />
          <rect x="122" y="66" width="24" height="10" rx="2" />
          <rect x="156" y="66" width="30" height="10" rx="2" />
        </g>

        {/* Headlight */}
        <circle cx="42" cy="118" r="6" fill="var(--color-bm-amber)" />

        {/* Door seam */}
        <rect x="116" y="100" width="2" height="56" fill="rgba(0,0,0,0.35)" />
        <rect x="152" y="100" width="2" height="56" fill="rgba(0,0,0,0.35)" />

        {/* Bottom skirt */}
        <rect x="22" y="158" width="176" height="10" rx="3" fill="var(--color-bm-red-deep)" />

        {/* Wheels */}
        <circle cx="60"  cy="172" r="10" fill="#0E1116" />
        <circle cx="60"  cy="172" r="4"  fill="#3a4252" />
        <circle cx="160" cy="172" r="10" fill="#0E1116" />
        <circle cx="160" cy="172" r="4"  fill="#3a4252" />
      </g>

      {/* Pantograph hint */}
      <rect x="98" y="32" width="40" height="4" rx="1" fill="#0E1116" />
      <rect x="116" y="20" width="4" height="14" fill="#0E1116" />
    </svg>
  )
}

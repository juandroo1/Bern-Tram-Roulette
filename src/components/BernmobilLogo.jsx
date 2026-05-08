// Bernmobil-style wordmark — italic lowercase "bernmobil" with the iconic
// yellow i-dot. Uses U+0131 (dotless ı) so the dot can be drawn as a
// controllable yellow circle on top.
//
// Tribute mark for this fan project, not the real Bernmobil logo file.
export default function BernmobilLogo({ className = '', tone = 'light' }) {
  const fg = tone === 'light' ? '#FFFFFF' : 'var(--color-bm-red)'
  const accent = '#FFC400'

  return (
    <svg
      viewBox="0 0 160 40"
      className={className}
      role="img"
      aria-label="bernmobil"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="2"
        y="30"
        fill={fg}
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="28"
        letterSpacing="-0.6"
        textLength="150"
        lengthAdjust="spacingAndGlyphs"
      >
        bernmobıl
      </text>
      {/* Yellow i-dot — the iconic Bernmobil accent.
          Position empirically placed above the dotless ı; tweak cx if the
          system font drifts the glyph layout. */}
      <circle cx="132" cy="10" r="3.6" fill={accent} />
    </svg>
  )
}

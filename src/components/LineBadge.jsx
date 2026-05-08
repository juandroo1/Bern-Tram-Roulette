// Bernmobil-style line badge — red square with bold white numeral, like real signage.
const SIZES = {
  sm: 'w-7 h-7 text-sm',
  md: 'w-9 h-9 text-base',
  lg: 'w-12 h-12 text-xl',
  xl: 'w-16 h-16 text-3xl',
}

export default function LineBadge({ line, size = 'md', className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-bm-red text-white font-black tabular-nums shadow-sm ring-1 ring-black/5 ${SIZES[size]} ${className}`}
    >
      {line}
    </span>
  )
}

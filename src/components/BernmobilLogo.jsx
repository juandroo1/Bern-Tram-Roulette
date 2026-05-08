// Renders the Bernmobil wordmark from the public-domain SVG hosted at
// https://commons.wikimedia.org/wiki/File:Bernmobil_Logo.svg
// (Below the threshold of originality, but trademark of Bernmobil — used here
// as a tribute in this fan project.)
//
//   tone="light" (default) → white version, for use on red backgrounds.
//   tone="dark"            → original red version, for use on white backgrounds.
export default function BernmobilLogo({ className = '', tone = 'light' }) {
  // Prefix with BASE_URL so the asset resolves correctly when the app is
  // served from a subpath (e.g. GitHub Pages: /<repo-name>/).
  const file = tone === 'dark' ? 'bernmobil-logo.svg' : 'bernmobil-logo-white.svg'
  const src = `${import.meta.env.BASE_URL}${file}`
  return <img src={src} alt="bernmobil" className={className} draggable={false} />
}

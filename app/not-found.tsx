export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <p className="font-serif text-8xl font-light text-gold mb-4">404</p>
        <p className="font-sans text-muted">Page not found</p>
        <a href="/" className="font-sans text-xs tracking-widest uppercase text-gold mt-8 inline-block hover:underline">
          ← Back
        </a>
      </div>
    </div>
  )
}

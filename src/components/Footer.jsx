import { Link } from 'react-router-dom'

const col = 'space-y-2 text-sm'
const a   = 'text-white/75 hover:text-white transition'

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* micro-dots + top glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="absolute -top-6 left-1/2 h-24 w-[90vw] -translate-x-1/2 rounded-full blur-3xl bg-white/10" />
      </div>

      {/* top divider */}
      <div className="border-t border-white/10" />

      <div className="relative container-max py-12">
        {/* top row */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand + short pitch */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 grid place-items-center rounded bg-brand-yellow text-black font-extrabold">
                TVF
              </div>
              <span className="sr-only">Home</span>
            </Link>
            <p className="text-white/70 max-w-sm">
              Stories with heart and hustle. Originals that make you laugh,
              think, and hit replay.
            </p>

            {/* social */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://youtube.com" target="_blank" rel="noreferrer"
                 className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
                 aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.6 32.6 0 0 0 0 12a32.6 32.6 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c2 .5 9.3.5 9.3.5s7.3 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2c.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.8 15.5v-7l6.1 3.5-6.1 3.5z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                 className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
                 aria-label="Facebook">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.7V12h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8V12h3l-.5 2.9h-2.5v7A10 10 0 0 0 22 12z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                 className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
                 aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm6-0.7a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className={col}>
            <h4 className="font-semibold text-white">Company</h4>
            <Link className={a} to="/about">About Us</Link>
            <Link className={a} to="/originals">Originals</Link>
            <Link className={a} to="/branded-content">Branded Content</Link>
            <Link className={a} to="/contact">Contact</Link>
            <a className={a} href="#">Careers</a>
          </div>

          <div className={col}>
            <h4 className="font-semibold text-white">Support</h4>
            <a className={a} href="#">Help Center</a>
            <a className={a} href="#">Advertise</a>
            <a className={a} href="#">Press</a>
            <a className={a} href="#">Partnerships</a>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Stay in the Loop</h4>
            <p className="text-sm text-white/70">Get fresh drops, announcements, and studio updates.</p>
            <form
              onSubmit={(e)=>{ e.preventDefault(); alert('Subscribed!') }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow/60"
              />
              <button className="rounded-xl bg-brand-yellow text-black font-semibold px-4 py-2">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-white/50">By subscribing you agree to our <a className="underline" href="#">Privacy Policy</a>.</p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} TVF Demo • Built with React, Express & MongoDB
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a className={a} href="#">Terms</a>
            <a className={a} href="#">Privacy</a>
            <a className={a} href="#">Cookies</a>
          </div>
        </div>
      </div>

      {/* decorative bottom gradient */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-[80vw] -translate-x-1/2 rounded-full blur-3xl bg-brand-yellow/10" />
    </footer>
  )
}

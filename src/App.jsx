// App.jsx
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'

function ScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])
  return null
}

export default function App() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const linkBase   = 'px-5 py-2.5 rounded-full text-sm font-medium transition-colors'
  const linkActive = 'bg-white text-black'
  const linkIdle   = 'text-white/90 hover:bg-white/10'

  // Active helpers
  const aboutActive = pathname === '/' && hash === '#about'
  const homeActive  = pathname === '/' && !hash   // <-- NEW

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToHash />

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="pointer-events-none absolute inset-0 bg-black/20 backdrop-blur-md" />
        <div className="relative container-max flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 grid place-items-center rounded bg-brand-yellow text-black font-extrabold">
              TMP
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <div className="rounded-full bg-white/10 border border-white/15 px-2 py-1 shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
              {/* HOME uses homeActive (not NavLink's isActive) */}
              <Link
                to="/"
                className={`${linkBase} ${homeActive ? linkActive : linkIdle}`}
              >
                Home
              </Link>

              {/* ABOUT scrolls to hash on Home */}
              <Link
                to="/#about"
                className={`${linkBase} ${aboutActive ? linkActive : linkIdle}`}
              >
                About Us
              </Link>

              <NavLink
                to="/originals"
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                Originals
              </NavLink>
              {/* <NavLink
                to="/branded-content"
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                Branded Content
              </NavLink> */}
              <NavLink
                to="/contact"
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                Contact Us
              </NavLink>
            </div>
          </nav>

          {/* Socials */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://youtube.com" target="_blank" rel="noreferrer"
               className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
               aria-label="YouTube" title="YouTube">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.6 32.6 0 0 0 0 12a32.6 32.6 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c2 .5 9.3.5 9.3.5s7.3 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2c.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.8 15.5v-7l6.1 3.5-6.1 3.5z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
               className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
               aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.7V12h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8V12h3l-.5 2.9h-2.5v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
               className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition"
               aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1.2 1.2 0 1 1-1.2-1.2A1.2 1.2 0 0 1 18 6.8z"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-10 h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/20"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white mt-1.5" />
            <span className="block h-0.5 w-5 bg-white mt-1.5" />
          </button>

          {/* Mobile drawer */}
          {open && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10">
              <div className="container-max py-4 flex flex-col gap-2">
                {/* Home uses homeActive */}
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg ${homeActive ? 'bg-white text-black' : 'text-white/90 hover:bg-white/10'}`}
                >
                  Home
                </Link>

                {/* About → hash on home */}
                <Link
                  to="/#about"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg ${aboutActive ? 'bg-white text-black' : 'text-white/90 hover:bg-white/10'}`}
                >
                  About Us
                </Link>

                <NavLink
                  to="/originals"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg ${isActive ? 'bg-white text-black' : 'text-white/90 hover:bg-white/10'}`
                  }
                >
                  Originals
                </NavLink>
                {/* <NavLink
                  to="/branded-content"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg ${isActive ? 'bg-white text-black' : 'text-white/90 hover:bg-white/10'}`
                  }
                >
                  Branded Content
                </NavLink> */}
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg ${isActive ? 'bg-white text-black' : 'text-white/90 hover:bg-white/10'}`
                  }
                >
                  Contact Us
                </NavLink>

                <div className="flex items-center gap-3 pt-2">
                  <a className="grid h-9 w-9 place-items-center rounded-full bg-white text-black" href="https://youtube.com" target="_blank" rel="noreferrer">Y</a>
                  <a className="grid h-9 w-9 place-items-center rounded-full bg-white text-black" href="https://facebook.com" target="_blank" rel="noreferrer">f</a>
                  <a className="grid h-9 w-9 place-items-center rounded-full bg-white text-black" href="https://instagram.com" target="_blank" rel="noreferrer">◎</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

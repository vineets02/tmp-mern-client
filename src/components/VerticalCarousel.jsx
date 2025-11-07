// client/src/components/VerticalCarousel.jsx
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { api, resolveImg } from '../api'

const EASE = 'cubic-bezier(.22,.61,.36,1)'
const ANIM_MS = 900

export default function VerticalCarousel({ endpoint = '/api/shows' }) {
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [jump, setJump] = useState(false)
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  const rootRef = useRef(null)
  const busyRef = useRef(false)

  useEffect(() => {
    let mounted = true
    api.get(endpoint).then(({ data }) => {
      if (!mounted) return
      setItems(Array.isArray(data) ? data : [])
      setIndex(0)
    })
    return () => { mounted = false }
  }, [endpoint])

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const doubled = useMemo(() => [...items, ...items], [items])

  useEffect(() => {
    if (!items.length) return
    if (index >= items.length) {
      setJump(true)
      const id = requestAnimationFrame(() => {
        setIndex(i => i % items.length)
        requestAnimationFrame(() => setJump(false))
      })
      return () => cancelAnimationFrame(id)
    }
  }, [index, items.length])

  const translateY = -(index * vh)

  const snapDone = () => { busyRef.current = false }
  const next = useCallback(() => {
    if (!items.length || busyRef.current) return
    busyRef.current = true
    setIndex(i => i + 1)
    setTimeout(snapDone, ANIM_MS * 0.55)
  }, [items.length])
  const prev = useCallback(() => {
    if (!items.length || busyRef.current) return
    busyRef.current = true
    setIndex(i => (i - 1 + (items.length || 1)) % (items.length || 1))
    setTimeout(snapDone, ANIM_MS * 0.55)
  }, [items.length])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = e => {
      if (Math.abs(e.deltaY) < 10) return
      e.preventDefault()
      e.deltaY > 0 ? next() : prev()
    }
    const onKey = e => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); next() }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev() }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('keydown', onKey)
    }
  }, [next, prev])

  if (!items.length) {
    return (
      <section className="relative w-full h-[70vh] grid place-items-center">
        <div className="text-white/60">Loading shows…</div>
      </section>
    )
  }

  const wrapDist = (a, b, n) => {
    const d = Math.abs(a - b) % n
    return Math.min(d, n - d)
  }

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden outline-none bg-black"
      tabIndex={0}
      aria-label="Shows carousel"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: jump ? 'none' : `transform ${ANIM_MS}ms ${EASE}`
        }}
      >
        {doubled.map((s, i) => {
          const n = items.length || 1
          const activeIdx = index % n
          const realIdx = i % n
          const d = wrapDist(realIdx, activeIdx, n)
          const scale = d === 0 ? 1.02 : d === 1 ? 0.97 : 0.95
          const opacity = d === 0 ? 1 : d === 1 ? 0.85 : 0.6
          const blur = d === 0 ? 0 : d === 1 ? 0.6 : 1.2
          const ahead = (realIdx - activeIdx + n) % n > 0
          const titleOffset = d === 0 ? 0 : (ahead ? 16 : -16)

          return (
            <Link
              key={`${s?.slug || 'item'}-${i}`}
              to={`/originals/${s.slug}`}
              className="relative block w-full bg-black"
              style={{ height: vh }}
            >
              {/* FULL + CENTERED IMAGE  */}
              <img
                src={resolveImg(s.thumbnail)}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 w-full h-auto my-6 object-cover object-center z-0"
                style={{
                  transform: `scale(${scale})`,
                  transition: `transform ${ANIM_MS}ms ${EASE}, filter ${ANIM_MS}ms ${EASE}, opacity ${ANIM_MS}ms ${EASE}`,
                  filter: `blur(${blur}px)`,
                  opacity
                }}
              />

              {/* Soft vignettes */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 z-10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-10" />

              {/* Title */}
              <div className="relative z-20 h-full grid place-items-center text-center px-6">
                <h3
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  style={{
                    transform: `translateY(${titleOffset}px) scale(${d === 0 ? 1 : 0.985})`,
                    transition: `transform ${ANIM_MS}ms ${EASE}, opacity ${ANIM_MS}ms ${EASE}`,
                    opacity: d === 0 ? 1 : 0.85
                  }}
                >
                  {s.title}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

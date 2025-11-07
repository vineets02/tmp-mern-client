// client/src/components/Hero.jsx
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../api'

// --- helpers for YouTube detection/embedding ---
function isYouTube(url=''){ return /youtube\.com|youtu\.be/i.test(url) }
function toYouTubeId(url=''){
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    return u.searchParams.get('v') || ''
  } catch { return '' }
}
function toYouTubeEmbed(url=''){
  const id = toYouTubeId(url)
  if (!id) return ''
  const base = `https://www.youtube-nocookie.com/embed/${id}`
  const q = [
    'autoplay=1','mute=1','controls=0','rel=0','modestbranding=1',
    'iv_load_policy=3','fs=0','disablekb=1','playsinline=1',
    'loop=1',`playlist=${id}`,'cc_load_policy=0'
  ].join('&')
  return `${base}?${q}`
}

export default function Hero(){
  // fetch a reel of hero slides (shows with heroVideo)
  const [slides, setSlides] = useState([])
  useEffect(() => {
    api.get('/api/shows/hero/reel?limit=6')
      .then(({data}) => setSlides(Array.isArray(data) ? data.filter(s => s?.heroVideo) : []))
      .catch(()=>setSlides([]))
  }, [])

  // slider state
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)
  const DURATION_MS = 4000     // 4 seconds per slide
  const FADE_MS = 700          // fade time (must be < DURATION_MS)

  // advance every 4s (pause when tab is hidden)
  useEffect(() => {
    if (!slides.length) return
    const start = () => {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setIdx(i => (i + 1) % slides.length)
      }, DURATION_MS)
    }
    const stop = () => clearInterval(timerRef.current)

    start()
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      stop()
    }
  }, [slides.length])

  // precompute embeds for YT to avoid recomputing every render
  const computed = useMemo(
    () => slides.map(s => ({ ...s, yt: isYouTube(s.heroVideo) ? toYouTubeEmbed(s.heroVideo) : '' })),
    [slides]
  )

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen grid place-items-center overflow-hidden">
      {/* Background reel - stacked slides */}
      <div className="absolute inset-0">
        {computed.map((s, i) => (
          <div
            key={s.slug || i}
            className={`absolute inset-0 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: `opacity ${FADE_MS}ms ease-out`,
              pointerEvents: 'none'
            }}
          >
            {s.yt ? (
              // YouTube background
              <div className="absolute inset-0 overflow-hidden">
                {/* overscale so it always fills; keeps controls hidden */}
                <div className="absolute inset-0 -m-[10%]">
                  <iframe
                    className="w-full h-full"
                    src={s.yt}
                    title={s.title || 'Trailer'}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="origin-when-cross-origin"
                  />
                </div>
              </div>
            ) : (
              // raw MP4/WebM background
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={s.heroVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        ))}

        {/* fallback image if no slides yet */}
        {!computed.length && (
          <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center" />
        )}
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Foreground content */}
      <div className="relative z-10 container-max text-center">
        <h1 className="heading-giant">Lights · Camera · Experiment</h1>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          React + Express + MongoDB demo.
        </p>
        <Link
          to="/originals"
          className="mt-6 inline-block px-5 py-3 bg-brand-yellow text-black rounded-lg font-semibold"
        >
          Browse Originals
        </Link>
      </div>
    </section>
  )
}

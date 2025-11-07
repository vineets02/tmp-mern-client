import React, { useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { fetchJSON, resolveImg } from '../api'
import ShowThumb from './ShowThumb'
import Modal from './Modal'

export default function ShowsCarousel({ shows = [], slidesToShow = 4, title = 'Latest & Trending' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps' },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  useEffect(() => { emblaApi?.reInit() }, [emblaApi, shows])

  // modal state
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(false)

  const openModal = async (s) => {
    setSlug(s)
    setOpen(true)
    setLoading(true)
    try {
      const data = await fetchJSON(`/api/shows/${s}`)
      setDetail(data)
    } catch {
      setDetail(null)
    } finally {
      setLoading(false)
    }
  }
  const closeModal = () => { setOpen(false); setDetail(null); setSlug(null) }

  // slide width helper
  const slideStyle = useMemo(() => {
    const pct = (100 / Math.max(1, slidesToShow)) + '%'
    return { width: `min(${pct}, 22rem)` }
  }, [slidesToShow])

  return (
    <section className="container-max pb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        {/* <div className="hidden sm:flex gap-2">
          <button onClick={() => emblaApi?.scrollPrev()} className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/15">‹</button>
          <button onClick={() => emblaApi?.scrollNext()} className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/15">›</button>
        </div> */}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex -mx-3">
            {shows.map((s) => (
              <div key={s.slug} className="shrink-0 px-3" style={slideStyle}>
                <ShowThumb show={s} onOpen={openModal} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details modal */}
      <Modal open={open} onClose={closeModal}>
        {loading && (
          <div className="p-10 text-center text-white/70">Loading…</div>
        )}

        {!loading && detail && (
          <div className="grid lg:grid-cols-2 gap-6 p-6 sm:p-8 items-start">
            <div className="order-2 lg:order-1">
              <h3 className="font-display text-3xl sm:text-4xl">{detail.title}</h3>
              <p className="mt-4 text-white/80 leading-7">{detail.description}</p>

              {Array.isArray(detail.awards) && detail.awards.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Accolades</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.awards.map((a, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(detail.cast) && detail.cast.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Cast</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.cast.map((c, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {detail.youtubeUrl && (
                  <a
                    href={detail.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-brand-yellow text-black rounded-lg font-semibold"
                  >Watch Now</a>
                )}
                <button
                  onClick={closeModal}
                  className="px-5 py-3 rounded-lg border border-white/20"
                >Close</button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src={resolveImg(detail.poster || detail.thumbnail)}
                alt={detail.title}
                className="w-full rounded-xl border border-white/10 shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {!loading && !detail && (
          <div className="p-10 text-center text-red-300">Failed to load details.</div>
        )}
      </Modal>
    </section>
  )
}

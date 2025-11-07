import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchJSON, resolveImg } from '../api'

export default function ShowDetail(){
  const { slug } = useParams()
  const [show, setShow] = useState(null)

  useEffect(() => {
    fetchJSON('/api/shows/' + slug).then(setShow).catch(() => setShow(null))
  }, [slug])

  if (!show) return <section className="container-max py-16">Loading...</section>

  return (
    <section className="container-max py-16 grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="font-display text-5xl">{show.title}</h1>
        <p className="mt-4 text-white/80 leading-7">{show.description}</p>

        {Array.isArray(show.awards) && show.awards.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Accolades</h3>
            <div className="flex flex-wrap gap-2">
              {show.awards.map((a,i)=>(
                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{a}</span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(show.cast) && show.cast.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Cast</h3>
            <div className="flex flex-wrap gap-2">
              {show.cast.map((c,i)=>(
                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{c}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex gap-3">
          <a href={show.youtubeUrl} target="_blank" rel="noreferrer"
             className="px-5 py-3 bg-brand-yellow text-black rounded-lg font-semibold">
            Watch Now
          </a>
          <Link to="/originals" className="px-5 py-3 rounded-lg border border-white/20">Back</Link>
        </div>
      </div>

      <div className="max-w-md lg:ml-auto">
        <img
          src={resolveImg(show.poster)}   // << important
          alt={show.title}
          className="w-full rounded-xl border border-white/10 shadow-2xl"
          loading="lazy"
        />
      </div>
    </section>
  )
}

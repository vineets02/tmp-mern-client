import { Link } from 'react-router-dom'
import { resolveImg } from '../api'

export default function ShowCard({ show }){
  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        <Link to={`/originals/${show.slug}`} className="hover:underline">
          <img
          src={resolveImg(show.thumbnail)}   // 👈 here
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
        </Link>
      
      </div>
      {/* <div className="p-4">
        <h3 className="font-semibold text-lg">{show.title}</h3>
        <p className="text-sm text-white/70 mt-1 line-clamp-2">{show.description}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-white/60">{show.genre}</span>
          <Link to={`/originals/${show.slug}`} className="hover:underline">Details →</Link>
        </div>
      </div> */}
    </div>
  )
}

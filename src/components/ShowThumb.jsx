import React from 'react'
import { resolveImg } from '../api'

export default function ShowThumb({ show, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(show.slug)}
      className="group w-full text-left rounded-xl overflow-hidden bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-yellow/70"
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={resolveImg(show.thumbnail || show.poster)}
          alt={show.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* subtle hover hint */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="font-semibold drop-shadow">{show.title}</div>
          <div className="text-xs px-2 py-1 rounded bg-white/10 border border-white/15">Details</div>
        </div>
      </div>
    </button>
  )
}

// client/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react'
import { api, resolveImg } from '../../api'

export default function AdminDashboard(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    slug:'', title:'', description:'', genre:'', tag:'original',
    youtubeUrl:'', awards:'', cast:''
  })
  const [thumb, setThumb]   = useState(null)
  const [poster, setPoster] = useState(null)
  const [isHero, setIsHero] = useState(false)
  const [inHeroReel, setInHeroReel] = useState(false)          // NEW
  const [heroTrailerUrl, setHeroTrailerUrl] = useState('')     // URL string
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await api.get('/api/shows')
    setList(data)
  }
  useEffect(()=>{ load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k,v]) => fd.append(k, v))
      if (thumb)  fd.append('thumbnail', thumb)
      if (poster) fd.append('poster', poster)

      // include hero fields (URL-based)
      fd.append('isHero', String(isHero))
      fd.append('inHeroReel', String(inHeroReel))              // NEW
      fd.append('heroTrailerUrl', heroTrailerUrl || '')

      await api.post('/api/shows', fd, { headers: { 'Content-Type':'multipart/form-data' } })
      setForm({ slug:'', title:'', description:'', genre:'', tag:'original', youtubeUrl:'', awards:'', cast:'' })
      setThumb(null); setPoster(null)
      setIsHero(false); setInHeroReel(false); setHeroTrailerUrl('')
      await load()
      setMsg('Show created.')
    } catch (e) {
      setMsg('Failed to create show. Check console.')
      console.error(e)
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this show?')) return
    await api.delete('/api/shows/' + id)
    await load()
  }

  const logout = () => { localStorage.removeItem('admintoken'); window.location.href='/admin/login' }

  // Mark as single hero (no trailer change)
  const markAsHero = async (id) => {
    if (!confirm('Make this the hero show?')) return
    await api.post(`/api/shows/${id}/hero`) // body empty = keep existing trailer URL
    await load()
  }

  // Prompt for a new URL and set it while marking as hero
  const setHeroUrlFor = async (id) => {
    const url = prompt('Enter trailer URL (mp4/webm or YouTube):')
    if (!url) return
    await api.post(`/api/shows/${id}/hero`, { heroVideoUrl: url })
    await load()
  }

  // ------- NEW: Reel actions -------
  const addToReel = async (id) => {
    await api.post(`/api/shows/${id}/reel`, { inHeroReel: true })
    await load()
  }
  const removeFromReel = async (id) => {
    await api.post(`/api/shows/${id}/reel`, { inHeroReel: false })
    await load()
  }
  const setReelUrl = async (id) => {
    const url = prompt('Enter trailer URL for reel (mp4/webm or YouTube):')
    if (!url) return
    await api.post(`/api/shows/${id}/reel`, { inHeroReel: true, heroVideoUrl: url })
    await load()
  }
  // ---------------------------------

  return (
    <section className="container-max py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="px-3 py-2 border border-white/20 rounded-lg">Logout</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mt-8">
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-xl mb-2">Add Show</h2>
          {msg && <div className="text-white/70">{msg}</div>}

          {['slug','title','description','genre','tag','youtubeUrl','awards','cast'].map(k => (
            <div key={k}>
              <label className="block text-sm text-white/70 mb-1 capitalize">{k}</label>
              {k==='description' ? (
                <textarea value={form[k]} onChange={e=>setForm({...form, [k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 h-24" />
              ) : (
                <input value={form[k]} onChange={e=>setForm({...form, [k]:e.target.value})}
                       className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
              )}
              {k==='awards' && <p className="text-xs text-white/50 mt-1">Comma separated</p>}
              {k==='cast'   && <p className="text-xs text-white/50 mt-1">Comma separated</p>}
            </div>
          ))}

          {/* HERO & REEL controls */}
          <div className="flex flex-wrap items-center gap-6">
            <label className="text-sm text-white/70 flex items-center gap-2">
              <input type="checkbox" checked={isHero} onChange={e=>setIsHero(e.target.checked)} />
              Set as Hero (single)
            </label>
            <label className="text-sm text-white/70 flex items-center gap-2">
              <input type="checkbox" checked={inHeroReel} onChange={e=>setInHeroReel(e.target.checked)} />
              Include in Hero Reel (slider)
            </label>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Hero Trailer URL (mp4/webm or YouTube)
            </label>
            <input
              value={heroTrailerUrl}
              onChange={e=>setHeroTrailerUrl(e.target.value)}
              placeholder="https://... .mp4 OR https://youtube.com/watch?v=..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
            />
            <p className="text-xs text-white/50 mt-1">
              Optional. Leave blank to set only the flags.
            </p>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Thumbnail</label>
            <input type="file" accept="image/*" onChange={e=>setThumb(e.target.files?.[0]||null)} />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Poster</label>
            <input type="file" accept="image/*" onChange={e=>setPoster(e.target.files?.[0]||null)} />
          </div>

          <button className="mt-2 bg-brand-yellow text-black font-semibold rounded-lg px-4 py-2">Create</button>
        </form>

        <div>
          <h2 className="font-semibold text-xl mb-2">All Shows</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {list.map(s => (
              <div key={s._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="aspect-[16/9]">
                  <img src={resolveImg(s.thumbnail)} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-semibold flex items-center gap-2 flex-wrap">
                    {s.title}
                    {s.isHero && (
                      <span className="text-xs px-2 py-0.5 rounded bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30">
                        HERO
                      </span>
                    )}
                    {s.inHeroReel && (
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-300/30">
                        IN REEL
                      </span>
                    )}
                  </div>
                  <div className="text-white/60 text-sm">{s.genre}</div>

                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <a href={`/originals/${s.slug}`} className="underline">View</a>
                    <button onClick={()=>del(s._id)} className="text-red-400">Delete</button>

                    {/* Hero actions */}
                    <button onClick={()=>markAsHero(s._id)}
                            className="text-sm border border-white/20 rounded px-2 py-1">
                      Set as Hero
                    </button>
                    <button onClick={()=>setHeroUrlFor(s._id)}
                            className="text-sm border border-white/20 rounded px-2 py-1">
                      Set Hero Trailer URL
                    </button>

                    {/* Reel actions (NEW) */}
                    <button onClick={()=>addToReel(s._id)}
                            className="text-sm border border-white/20 rounded px-2 py-1">
                      Add to Reel
                    </button>
                    <button onClick={()=>removeFromReel(s._id)}
                            className="text-sm border border-white/20 rounded px-2 py-1">
                      Remove from Reel
                    </button>
                    <button onClick={()=>setReelUrl(s._id)}
                            className="text-sm border border-white/20 rounded px-2 py-1">
                      Set Reel URL
                    </button>
                  </div>

                  {s.heroVideo && (
                    <div className="mt-2 text-xs text-white/60 break-all">
                      Trailer: {s.heroVideo}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

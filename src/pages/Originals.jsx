import { useEffect, useState } from 'react'
import { fetchJSON } from '../api'
import ShowCard from '../components/ShowCard'
import VerticalCarousel from '../components/VerticalCarousel'

export default function Originals(){
  const [shows, setShows] = useState([])
  const [q,setQ] = useState('')
  useEffect(()=>{ fetchJSON('/api/shows').then(setShows) },[])
  const list = shows.filter(s => s.title.toLowerCase().includes(q.toLowerCase()))
  return (
   <section className="container-max pb-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Latest & Trending</h2>
   <VerticalCarousel endpoint="/api/shows" />
    </section>
  )
}

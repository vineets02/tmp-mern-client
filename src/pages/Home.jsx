import Hero from '../components/Hero'
import CountUp from '../components/CountUp'
import { fetchJSON } from '../api'
import { useEffect, useState } from 'react'
import ShowCard from '../components/ShowCard'
import AboutTheater from '../components/AboutTheater'
import ShowsCarousel from '../components/ShowsCarousel'

export default function Home(){
  const [shows, setShows] = useState([])
  useEffect(() => { fetchJSON('/api/shows').then(setShows).catch(()=>{}) }, [])

  return (
    <div>
      <div className="-mt-24">
        <Hero />

       <section id="about" className="scroll-mt-24">
         <AboutTheater />

        </section>
      </div>
        {/* <section className="container-max py-12">
        <div className="grid sm:grid-cols-2 gap-8 text-center">
          <div>
            <CountUp to={100} suffix="+" />
            <div className="text-white/70">Number of Shows</div>
          </div>
          <div>
            <CountUp to={13} />
            <div className="text-white/70">Years of Disrupting Indian Storytelling</div>
          </div>
        </div>
      </section> */}
        <ShowsCarousel
        shows={shows}              // full list; Embla loops automatically
        slidesToShow={3}           // desktop visible count (auto responsive)
        title="Latest & Trending"
      />
    </div>
  )
}

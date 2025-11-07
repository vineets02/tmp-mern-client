import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to=100, suffix='+', duration=1500, className='' }){
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = t => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * to))
      if (p < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [inView, to, duration])

  return <div ref={ref} className={className}><span className="font-display text-6xl">{val}{suffix}</span></div>
}

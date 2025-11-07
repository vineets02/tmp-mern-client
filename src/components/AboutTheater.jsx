// client/src/components/AboutSection.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUp from './CountUp'

const fadeUp = { hidden:{opacity:0,y:18}, show:{opacity:1,y:0,transition:{duration:.55,ease:'easeOut'}} }
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:.12, delayChildren:.1 } } }

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden">
      {/* soft ambient & micro-dots (keep whatever you already had) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(65%_60%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -120px 0px' }}
        className="relative container-max py-16 sm:py-20 lg:py-24"
      >
        {/* Header block with ambient shine over the whole panel */}
        <motion.div variants={fadeUp} className="mx-auto max-w-4xl">
          <div className="glass shine ambient-shine rounded-3xl px-6 sm:px-10 py-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              About <span className="text-brand-yellow">Us</span>
            </h2>
            <p className="mt-4 text-white/80 leading-7">
              We blend craft and code to tell Indian stories with heart. From small-town mischief to big-city hustle —
              our originals aim to make you laugh, think, and hit replay.
            </p>
          </div>
        </motion.div>

        {/* Stat cards with hover shine */}
      <motion.div variants={stagger} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* 100+ */}
          <motion.div variants={fadeUp} className="glass shine animate-shine rounded-2xl p-5">
            <div className="text-3xl font-bold">
              <CountUp to={100} suffix="+" />
            </div>
            <div className="text-sm text-white/70 mt-1">Original Shows</div>
          </motion.div>

          {/* 13 */}
          <motion.div variants={fadeUp} className="glass shine animate-shine rounded-2xl p-5">
            <div className="text-3xl font-bold">
              <CountUp to={13} />
            </div>
            <div className="text-sm text-white/70 mt-1">Years Creating</div>
          </motion.div>

          {/* 50M+ (animate to 50, show M+) */}
          <motion.div variants={fadeUp} className="glass shine animate-shine rounded-2xl p-5">
            <div className="text-3xl font-bold">
              <CountUp to={50} suffix="M+" />
            </div>
            <div className="text-sm text-white/70 mt-1">Total Views</div>
          </motion.div>

          {/* 200+ */}
          <motion.div variants={fadeUp} className="glass shine animate-shine rounded-2xl p-5">
            <div className="text-3xl font-bold">
              <CountUp to={200} suffix="+" />
            </div>
            <div className="text-sm text-white/70 mt-1">Creators & Cast</div>
          </motion.div>
        
        </motion.div>

        {/* CTA with subtle glass and hover shine */}
        {/* <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center">
          <Link
            to="/about"
            className="shine animate-shine inline-flex items-center gap-2 rounded-xl bg-brand-yellow text-black font-semibold px-5 py-3 hover:brightness-95 transition"
          >
            Know Our Story
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M13.2 5l6.3 6.3-6.3 6.3-1.4-1.4 3.9-3.9H4v-2h11.7L11.8 6.4 13.2 5z"/>
            </svg>
          </Link>
        </motion.div> */}
      </motion.div>
    </section>
  )
}

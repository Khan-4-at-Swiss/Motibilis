import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'

export default function Intro() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'pop' | 'loading' | 'done'>('pop')
  const swordRef = useRef<HTMLImageElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sword popup animation
    const swordTimer = setTimeout(() => {
      setPhase('loading')
    }, 1800)

    // Loading bar completes
    const loadingTimer = setTimeout(() => {
      setPhase('done')
    }, 4300)

    // Navigate to home
    const navTimer = setTimeout(() => {
      navigate('/home')
    }, 5000)

    return () => {
      clearTimeout(swordTimer)
      clearTimeout(loadingTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] transition-opacity duration-500 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Sword Popup Animation - Circular image */}
      <div
        className="relative z-10"
        style={{
          animation: 'popupSword 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        }}
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl p-1 bg-gradient-to-br from-[#D4AF37]/20 to-black">
          <img
            ref={swordRef}
            src="/images/motibilis.jpg"
            alt="Motibilis"
            className="w-full h-full object-cover rounded-full drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 60px rgba(212, 175, 55, 0.2))',
            }}
          />
        </div>
      </div>

      {/* Brand Name */}
      <h1
        className={`font-cinzel text-4xl md:text-6xl font-bold text-[#D4AF37] mt-8 tracking-[0.3em] glow-gold z-10 transition-all duration-1000 ${
          phase === 'pop' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        MOTIBILIS
      </h1>

      {/* Subtitle */}
      <p
        className={`font-inter text-xs md:text-sm text-[#C0C0C0] tracking-[0.5em] uppercase mt-3 z-10 transition-all duration-1000 delay-200 ${
          phase === 'pop' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        Academic &amp; Professional Tools
      </p>

      {/* Loading Bar */}
      <div
        className={`mt-10 z-10 transition-opacity duration-500 ${
          phase === 'pop' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-[300px] h-[2px] bg-[#1a1a1a] relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] via-[#E5C048] to-[#D4AF37] origin-left"
            style={{
              animation: phase === 'loading' || phase === 'done'
                ? 'loadingBar 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                : 'none',
            }}
          />
        </div>
        <p className="text-center text-[10px] text-[#888] tracking-[0.3em] mt-3 font-inter uppercase">
          {phase === 'done' ? 'Ready' : 'Loading Experience'}
        </p>
      </div>

      {/* Sparkle particles */}
      {phase !== 'pop' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full star-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

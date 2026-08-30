import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Starfield from '@/components/Starfield'
import Footer from '@/components/Footer'
import { getCategories, getProducts } from '@/data/store'
import { ArrowRight, Sparkles, Package, Clock, ExternalLink } from 'lucide-react'

// Automatically handles local vs GitHub Pages base path
const base = import.meta.env.BASE_URL || '/'

export default function Home() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(true)

  const [categoriesList, setCategoriesList] = useState(() => getCategories())
  const [productsList, setProductsList] = useState(() => getProducts())

  useEffect(() => {
    const handleDataChange = () => {
      setCategoriesList(getCategories())
      setProductsList(getProducts())
    }
    window.addEventListener('motibilis_data_changed', handleDataChange)
    return () => window.removeEventListener('motibilis_data_changed', handleDataChange)
  }, [])

  // Scroll-reversed video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    const handleScroll = () => {
      if (!video || !video.duration) return
      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / (maxScroll * 0.5), 1)
      video.currentTime = (1 - progress) * video.duration

      setHeroVisible(scrollTop < 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-black">
      <Navigation />
      <Starfield />

      {/* Video Background Hero */}
      <div ref={heroRef} className="relative h-[200vh]">
        {/* Fixed video layer */}
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            src={`${base}videos/motibilis.mp4`}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{ filter: 'brightness(0.4) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
        </div>

        {/* Hero Content - First viewport */}
        <div
          className="sticky top-0 h-screen flex flex-col items-center justify-center z-[2] transition-opacity duration-500"
          style={{ opacity: heroVisible ? 1 : 0 }}
        >
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 spin-slow rounded-full p-1 bg-gradient-to-br from-[#D4AF37]/30 to-black">
              <img
                src={`${base}images/motibilis.jpg`}
                alt="Motibilis"
                className="w-full h-full object-cover rounded-full border-2 border-[#D4AF37]/30 shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
                }}
              />
            </div>
            <div className="absolute inset-[-20px] border border-[#D4AF37]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>

          {/* Title */}
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-[#D4AF37] tracking-[0.2em] glow-gold text-center">
            MOTIBILIS
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-sm md:text-base text-[#C0C0C0] tracking-[0.5em] uppercase mt-4 text-center">
            Academic &amp; Professional Tools Showcase
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-8 mt-8">
            <div className="text-center">
              <p className="font-cinzel text-2xl text-[#D4AF37]">{categoriesList.length}</p>
              <p className="text-[10px] text-[#888] uppercase tracking-widest">Categories</p>
            </div>
            <div className="w-[1px] h-8 bg-[#D4AF37]/20" />
            <div className="text-center">
              <p className="font-cinzel text-2xl text-[#D4AF37]">{productsList.length}</p>
              <p className="text-[10px] text-[#888] uppercase tracking-widest">Software Tools</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToCategories}
            className="absolute bottom-12 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <span className="text-[10px] text-[#888] uppercase tracking-[0.3em] group-hover:text-[#D4AF37] transition-colors">
              Explore Showcase
            </span>
            <div className="w-6 h-10 border border-[#D4AF37]/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <section
        id="categories-section"
        className="relative z-10 bg-gradient-to-b from-black via-[#0A080C] to-[#0A080C] py-20"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] uppercase tracking-[0.5em]">Browse</span>
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-4">
              Software <span className="text-[#D4AF37]">Categories</span>
            </h2>
            <p className="text-[#888] text-sm max-w-md mx-auto">
              Explore our collection of cutting-edge academic and professional software solutions
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesList.map((category, i) => (
              <div
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:scale-[1.02] hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-transparent transition-all duration-500" />

                  {/* Category Image */}
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={
                        category.imageUrl
                          ? category.imageUrl.startsWith('http')
                            ? category.imageUrl
                            : `${base}${category.imageUrl.replace(/^\//, '')}`
                          : `${base}images/motibilis.jpg`
                      }
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A080C] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-[#D4AF37]" />
                      <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[#888] mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666] uppercase tracking-widest">
                        {productsList.filter(p => p.categoryId === category.id).length} Software Tools
                      </span>
                      <div className="flex items-center gap-1 text-[#D4AF37] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Section */}
          {productsList.some(p => p.status === 'coming_soon') && (
            <div className="mt-20">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-cinzel text-2xl text-[#D4AF37]">Upcoming Software</h3>
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productsList
                  .filter(p => p.status === 'coming_soon')
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/20 rounded-lg overflow-hidden opacity-80 cursor-pointer hover:opacity-100 hover:border-[#D4AF37]/50 transition-all"
                    >
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-widest rounded-full pulse-gold">
                          Coming Soon
                        </span>
                      </div>
                      <div className="p-6">
                        <h4 className="font-cinzel text-lg text-white mb-2">{product.name}</h4>
                        <p className="text-xs text-[#888] line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Showcase Section */}
      <section className="relative z-10 bg-black py-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/20 rounded-lg p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#D4AF37]/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#D4AF37]/20" />

            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-4">
              Explore <span className="text-[#D4AF37]">Open Source &amp; Projects</span>
            </h2>
            <p className="text-[#888] text-sm max-w-lg mx-auto mb-8">
              Discover specs, documentations, and live direct links for all Motibilis applications.
            </p>
            <a
              href="https://github.com/AFAQXMOTIBILIS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Visit GitHub Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
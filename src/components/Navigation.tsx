import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/home')
      setTimeout(() => {
        const categoriesEl = document.getElementById('categories-section')
        if (categoriesEl) categoriesEl.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
    setMobileMenu(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,8,12,0.9)] backdrop-blur-xl border-b border-[rgba(212,175,55,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 spin-slow">
              {/* ✅ Fixed path using ./ instead of / */}
              <img
                src="./images/motibilis.jpg"
                alt="Motibilis"
                className="w-full h-full object-cover rounded-full border border-[#D4AF37]/30"
              />
            </div>
            <span className="font-cinzel text-lg font-bold text-[#D4AF37] tracking-[0.2em] group-hover:glow-gold transition-all">
              MOTIBILIS
            </span>
          </Link>

          {/* Desktop Public Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={scrollToCategories}
              className="text-xs font-inter uppercase tracking-[0.2em] text-[#C0C0C0] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Categories
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#D4AF37]"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[rgba(10,8,12,0.95)] backdrop-blur-xl border-t border-[rgba(212,175,55,0.1)] px-6 py-4 space-y-4">
            <button onClick={scrollToCategories} className="block text-sm text-[#C0C0C0] hover:text-[#D4AF37] w-full text-left">
              Categories
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
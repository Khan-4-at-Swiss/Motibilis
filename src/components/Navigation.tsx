import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Sparkles } from 'lucide-react'
import { getAssetUrl } from '@/lib/assets'
import { searchProducts, type Product } from '@/data/store'

export default function Navigation() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchProducts(searchQuery))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Keyboard shortcut Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

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

  const handleSelectProduct = (productId: number) => {
    setSearchOpen(false)
    setSearchQuery('')
    navigate(`/product/${productId}`)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,8,12,0.92)] backdrop-blur-xl border-b border-[rgba(212,175,55,0.15)] shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 spin-slow">
              <img
                src={getAssetUrl('images/motibilis.jpg')}
                alt="Motibilis"
                className="w-full h-full object-cover rounded-full border border-[#D4AF37]/40 shadow-lg"
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

            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15121A] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 text-xs text-[#888] hover:text-[#D4AF37] transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="tracking-wider">Search Tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-black/50 border border-[#333] rounded text-[#666]">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu & Search Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[rgba(10,8,12,0.98)] backdrop-blur-2xl border-t border-[rgba(212,175,55,0.15)] px-6 py-4 space-y-4">
            <button
              onClick={scrollToCategories}
              className="block text-sm font-cinzel text-[#C0C0C0] hover:text-[#D4AF37] w-full text-left py-2"
            >
              Categories &amp; Tools
            </button>
          </div>
        )}
      </nav>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div
            className="w-full max-w-xl bg-gradient-to-b from-[#15121A] to-[#0A080C] border border-[#D4AF37]/30 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-[#D4AF37]/20">
              <Search className="w-5 h-5 text-[#D4AF37] shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, technology, or feature..."
                className="w-full bg-transparent text-sm text-white placeholder-[#666] outline-none font-inter"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#888] hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="p-6 text-center text-xs text-[#666]">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]/40 mx-auto mb-2" />
                  Type any keyword to search across the Motibilis software suite
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#888]">
                  No software tools found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                searchResults.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectProduct(tool.id)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/20 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-black/50 shrink-0 border border-[#D4AF37]/20">
                        <img
                          src={tool.screenshots?.[0] || getAssetUrl('images/motibilis.jpg')}
                          alt={tool.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-cinzel text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-[11px] text-[#888] line-clamp-1">{tool.techStack}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] uppercase px-2 py-0.5 rounded-full ${
                        tool.status === 'available'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      }`}
                    >
                      {tool.status === 'available' ? 'Live' : 'Upcoming'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 bg-black/40 border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] text-[#666]">
              <span>Press ESC to close</span>
              <span>Motibilis Search Engine</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
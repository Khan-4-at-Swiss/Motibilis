import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getProductById, getCategoryById } from '@/data/store'
import {
  ArrowLeft, ChevronLeft, ChevronRight,
  CheckCircle, Clock, Package, ExternalLink, Cpu, Layers, ShieldCheck
} from 'lucide-react'

// Automatically handles local vs GitHub Pages base path
const base = import.meta.env.BASE_URL || '/'

// Helper to format asset paths cleanly
const resolveAssetPath = (path: string) => {
  if (!path) return `${base}images/motibilis.jpg`
  if (path.startsWith('http')) return path
  return `${base}${path.replace(/^\//, '')}`
}

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const productId = Number(params.id)

  const [product, setProduct] = useState(() => getProductById(productId))
  const [category, setCategory] = useState(() => (product ? getCategoryById(product.categoryId) : undefined))
  const [currentMedia, setCurrentMedia] = useState(0)

  useEffect(() => {
    const updateData = () => {
      const p = getProductById(productId)
      setProduct(p)
      if (p) setCategory(getCategoryById(p.categoryId))
    }
    updateData()
    window.addEventListener('motibilis_data_changed', updateData)
    return () => window.removeEventListener('motibilis_data_changed', updateData)
  }, [productId])

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#333] mx-auto mb-4" />
          <p className="text-[#888]">Software specification not found</p>
          <button onClick={() => navigate('/home')} className="mt-4 btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Map all screenshots through the base path fixer
  const rawScreenshots = product.screenshots && product.screenshots.length > 0 
    ? product.screenshots 
    : ['images/motibilis.jpg']
  
  const screenshots = rawScreenshots.map(resolveAssetPath)

  const handlePrevMedia = () => {
    setCurrentMedia((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const handleNextMedia = () => {
    setCurrentMedia((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/category/${product.categoryId}`)}
            className="flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Category
          </button>

          {/* Product Detail & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Media Viewer Showcase */}
            <div>
              <div className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/20 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={screenshots[currentMedia]}
                  alt={product.name}
                  className="w-full aspect-video object-cover"
                />

                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37]/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextMedia}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37]/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Badges / Tech Summary */}
              <div className="mt-6 bg-[#0A080C] border border-[#D4AF37]/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#888]">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" />
                  <span>Architecture: <strong>64-bit / Web</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#888]">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>Verified &amp; Secure</span>
                </div>
              </div>
            </div>

            {/* Product Info & Specifications Panel */}
            <div>
              {/* Status Badge */}
              <div className="mb-4">
                {product.status === 'coming_soon' ? (
                  <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase tracking-widest rounded-full inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Under Active Development
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs uppercase tracking-widest rounded-full inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Live &amp; Operational
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-2 glow-gold">
                {product.name}
              </h1>
              <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-cinzel mb-6">
                Category: {category?.name || 'General'}
              </p>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xs text-[#888] uppercase tracking-widest mb-2 font-cinzel">Overview</h3>
                <p className="text-sm text-[#C0C0C0] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xs text-[#888] uppercase tracking-widest mb-3 font-cinzel flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  Technologies &amp; Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack?.split(',').map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#15121A] border border-[#D4AF37]/20 text-[#D4AF37] text-xs rounded font-mono"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Specifications / Feature List */}
              <div className="mb-8 bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/15 rounded-lg p-6">
                <h3 className="text-xs text-[#D4AF37] uppercase tracking-widest mb-4 font-cinzel">
                  System Specifications &amp; Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#C0C0C0]">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visit Link Button */}
              <div className="pt-2">
                <a
                  href={product.websiteUrl || 'https://github.com/AFAQXMOTIBILIS'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-4 text-center inline-flex items-center justify-center gap-3 text-base shadow-2xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Official Website / Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
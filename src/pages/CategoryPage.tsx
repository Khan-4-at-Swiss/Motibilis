import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Starfield from '@/components/Starfield'
import { getCategoryById, getProductsByCategory, type Category, type Product } from '@/data/store'
import { getAssetUrl } from '@/lib/assets'
import { ArrowLeft, Package, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const categoryId = Number(params.id)

  const [category, setCategory] = useState<Category | undefined>(() => getCategoryById(categoryId))
  const [categoryProducts, setCategoryProducts] = useState<Product[]>(() =>
    getProductsByCategory(categoryId),
  )

  useEffect(() => {
    const updateData = () => {
      setCategory(getCategoryById(categoryId))
      setCategoryProducts(getProductsByCategory(categoryId))
    }
    updateData()
    window.addEventListener('motibilis_data_changed', updateData)
    return () => window.removeEventListener('motibilis_data_changed', updateData)
  }, [categoryId])

  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#333] mx-auto mb-4" />
          <p className="text-[#888]">Category not found</p>
          <button onClick={() => navigate('/home')} className="mt-4 btn-primary cursor-pointer">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navigation />
      <Starfield />

      <div className="pt-24 pb-20 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showcase
          </button>

          {/* Category Hero Banner */}
          <div className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/20 rounded-lg p-8 md:p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <img
                src={getAssetUrl(category.imageUrl)}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-xs text-[#D4AF37] uppercase tracking-[0.4em] font-cinzel">
                Software Category
              </span>
              <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-white mt-2 mb-4 glow-gold">
                {category.name}
              </h1>
              <p className="text-sm md:text-base text-[#C0C0C0] leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <h2 className="font-cinzel text-2xl text-white mb-8 flex items-center gap-3">
              <Package className="w-6 h-6 text-[#D4AF37]" />
              Available Tools ({categoryProducts.length})
            </h2>

            {categoryProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#0A080C] border border-[#D4AF37]/10 rounded-lg">
                <Package className="w-12 h-12 text-[#444] mx-auto mb-4" />
                <p className="text-[#888] text-sm">No software tools found in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/15 rounded-lg overflow-hidden cursor-pointer hover:border-[#D4AF37]/50 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                  >
                    {/* Product Preview Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={getAssetUrl(product.screenshots?.[0] || 'images/motibilis.jpg')}
                        alt={product.name}
                        className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        {product.status === 'coming_soon' ? (
                          <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-widest rounded-full inline-flex items-center gap-1 backdrop-blur-md border border-[#D4AF37]/30">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] uppercase tracking-widest rounded-full inline-flex items-center gap-1 backdrop-blur-md border border-green-500/30">
                            <CheckCircle className="w-3 h-3" />
                            Live
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#888] line-clamp-2 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/10">
                        <span className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest truncate max-w-[150px]">
                          {product.techStack?.split(',')[0] || 'Software'}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#D4AF37] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 font-cinzel font-semibold">
                          View Specs
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
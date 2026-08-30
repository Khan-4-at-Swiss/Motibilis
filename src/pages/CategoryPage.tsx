import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getCategoryById, getProductsByCategory } from '@/data/store'
import { ArrowLeft, Package, ArrowRight, Clock, Sparkles } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const categoryId = Number(params.id)

  const [category, setCategory] = useState(() => getCategoryById(categoryId))
  const [products, setProducts] = useState(() => getProductsByCategory(categoryId))

  useEffect(() => {
    const updateData = () => {
      setCategory(getCategoryById(categoryId))
      setProducts(getProductsByCategory(categoryId))
    }
    updateData()
    window.addEventListener('motibilis_data_changed', updateData)
    return () => window.removeEventListener('motibilis_data_changed', updateData)
  }, [categoryId])

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-4 mb-4">
            <Package className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-white">
              {category?.name || 'Category'}
            </h1>
          </div>
          <p className="text-[#888] text-sm max-w-lg">
            {category?.description || 'Browse our software solutions'}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-[#15121A] to-[#0A080C] border border-[#D4AF37]/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:scale-[1.02] hover:shadow-2xl">
                    {/* Product Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={product.screenshots?.[0] || '/images/motibilis.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A080C] to-transparent" />

                      {/* Status Badge */}
                      {product.status === 'coming_soon' ? (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-widest rounded-full pulse-gold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#888] mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      {product.techStack && (
                        <p className="text-[10px] text-[#666] mb-3 uppercase tracking-wider font-mono">
                          {product.techStack}
                        </p>
                      )}
                      <div className="flex items-center justify-between border-t border-[#D4AF37]/10 pt-4">
                        <span className="text-xs text-[#D4AF37] uppercase tracking-widest">
                          Software Specs
                        </span>
                        <div className="flex items-center gap-1 text-[#D4AF37] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                          View Details
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-[#333] mx-auto mb-4" />
              <p className="text-[#888] text-lg">No products in this category yet</p>
              <p className="text-[#666] text-sm mt-2">Check back soon for new additions</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

// ✅ CORRECT
import { useNavigate } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Starfield from '@/components/Starfield'
import { Package, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between relative">
      <Navigation />
      <Starfield />

      <div className="pt-32 pb-20 px-6 text-center z-10 my-auto">
        <Package className="w-20 h-20 text-[#D4AF37] mx-auto mb-6 opacity-60 glow-gold" />
        <h1 className="font-cinzel text-6xl font-bold text-white mb-2">404</h1>
        <h2 className="font-cinzel text-xl text-[#D4AF37] mb-6">Page Not Found</h2>
        <p className="text-[#888] text-sm max-w-md mx-auto mb-8">
          The software showcase page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <Footer />
    </div>
  )
}
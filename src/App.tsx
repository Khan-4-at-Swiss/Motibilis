import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Intro from './pages/Intro'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" theme="dark" />
    </>
  )
}

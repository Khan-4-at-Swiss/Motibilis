import { categories, type Category } from './categories'
import { products, type Product } from './products'

// ─── Motibilis Data & State Engine ───
// Centralized data access layer with local storage bookmarking,
// search indexing, category filtering, and status checks.

export type { Category } from './categories'
export type { Product } from './products'

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getProducts(): Product[] {
  return [...products].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products
    .filter((p) => p.categoryId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.status === 'available').slice(0, 4)
}

export function getComingSoonProducts(): Product[] {
  return products.filter((p) => p.status === 'coming_soon')
}

// ─── Search & Filter Engine ───
export function searchProducts(
  query = '',
  categoryId?: number | 'all',
  status?: 'all' | 'available' | 'coming_soon',
): Product[] {
  const q = query.trim().toLowerCase()

  return products.filter((product) => {
    // Category filter
    if (categoryId && categoryId !== 'all' && product.categoryId !== categoryId) {
      return false
    }

    // Status filter
    if (status && status !== 'all' && product.status !== status) {
      return false
    }

    // Text search
    if (!q) return true

    const nameMatch = product.name.toLowerCase().includes(q)
    const descMatch = product.description.toLowerCase().includes(q)
    const techMatch = product.techStack.toLowerCase().includes(q)
    const featMatch = product.features.some((f) => f.toLowerCase().includes(q))

    return nameMatch || descMatch || techMatch || featMatch
  })
}

// ─── Bookmarks / Favorites Storage ───
const BOOKMARKS_KEY = 'motibilis_bookmarks_v1'

export function getBookmarkedProductIds(): number[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function toggleBookmark(productId: number): boolean {
  try {
    const current = getBookmarkedProductIds()
    let updated: number[]
    let isNowBookmarked = false

    if (current.includes(productId)) {
      updated = current.filter((id) => id !== productId)
      isNowBookmarked = false
    } else {
      updated = [...current, productId]
      isNowBookmarked = true
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('motibilis_bookmarks_changed', { detail: { updated, productId } }))
    return isNowBookmarked
  } catch {
    return false
  }
}

export function isBookmarked(productId: number): boolean {
  return getBookmarkedProductIds().includes(productId)
}

// ─── Tool Health & System Status Monitor ───
export interface ToolSystemHealth {
  id: number
  name: string
  status: 'operational' | 'development' | 'maintenance'
  latencyMs: number
  platform: string
}

export function getSystemStatus(): ToolSystemHealth[] {
  return products.map((p) => {
    return {
      id: p.id,
      name: p.name,
      status: p.status === 'available' ? 'operational' : 'development',
      latencyMs: p.status === 'available' ? Math.floor(Math.random() * 35) + 15 : 0,
      platform: p.techStack.includes('Kotlin')
        ? 'Android / APK'
        : p.techStack.includes('Angular') || p.techStack.includes('.NET')
          ? 'Enterprise Cloud'
          : 'Web / Client-Side',
    }
  })
}

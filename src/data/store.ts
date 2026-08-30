import { categories, type Category } from './categories'
import { products, type Product } from './products'

// ─── Data Layer ───
// This site has no backend/database. The two files below
// (categories.ts and products.ts) ARE the database — edit
// them directly, commit, and redeploy to change what's shown.

export function getCategories(): Category[] {
  return categories
}

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find(c => c.id === id)
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products
    .filter(p => p.categoryId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

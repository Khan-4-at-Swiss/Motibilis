/**
 * Asset URL Resolver
 * Ensures all assets (images, videos, icons) resolve correctly
 * regardless of local development or GitHub Pages subpath deployment (/Motibilis/).
 */

export function getAssetUrl(path?: string | null): string {
  if (!path) {
    const base = import.meta.env.BASE_URL || '/'
    const cleanBase = base.endsWith('/') ? base : `${base}/`
    return `${cleanBase}images/motibilis.jpg`
  }

  // If external or data URL, return directly
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  // Get normalized base URL (e.g., '/Motibilis/' or '/')
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const baseFolder = normalizedBase.replace(/^\/+|\/+$/g, '') // e.g., 'Motibilis'

  // Clean the incoming path
  let cleanPath = path.trim().replace(/^\/+/, '') // Remove leading slashes

  // If the path already begins with the base folder (e.g. 'Motibilis/images/...'), remove it
  if (baseFolder && (cleanPath === baseFolder || cleanPath.startsWith(`${baseFolder}/`))) {
    cleanPath = cleanPath.slice(baseFolder.length).replace(/^\/+/, '')
  }

  // If path starts with './'
  cleanPath = cleanPath.replace(/^\.\/+/, '')

  return `${normalizedBase}${cleanPath}`
}

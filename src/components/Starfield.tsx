import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
  size: number
  brightness: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()

    // Initialize stars
    const STAR_COUNT = 3000
    const stars: Star[] = []
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 200 + Math.random() * 600
      stars.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        px: 0, py: 0,
        size: Math.random() * 1.5 + 0.3,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      })
    }
    starsRef.current = stars

    let time = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2
      mouseRef.current.y = (e.clientY / height - 0.5) * 2
    }

    const draw = () => {
      time += 1
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const fov = 400

      // Mouse influence
      const mx = mouseRef.current.x * 50
      const my = mouseRef.current.y * 50

      for (const star of stars) {
        // Rotate around Y axis (slow drift)
        const rotSpeed = 0.0003
        const cos_r = Math.cos(rotSpeed)
        const sin_r = Math.sin(rotSpeed)
        const nx = star.x * cos_r - star.z * sin_r
        const nz = star.x * sin_r + star.z * cos_r
        star.x = nx
        star.z = nz

        // Mouse push effect
        const dx = star.x - mx * 5
        const dy = star.y - my * 5
        const dist = Math.sqrt(dx * dx + dy * dy)
        const push = Math.max(0, 1 - dist / 200) * 3
        star.x += (dx / (dist || 1)) * push
        star.y += (dy / (dist || 1)) * push

        // Project to 2D
        const z = star.z + fov
        if (z <= 0) continue

        const sx = (star.x * fov) / z + centerX
        const sy = (star.y * fov) / z + centerY

        if (sx < 0 || sx > width || sy < 0 || sy > height) continue

        // Twinkle
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const alpha = star.brightness * twinkle * Math.min(1, fov / z)

        // Draw star
        const size = star.size * (fov / z) * 0.8
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)

        // Gold/white color variation
        const hue = star.brightness > 0.7 ? 43 : 0
        const sat = star.brightness > 0.7 ? 65 : 0
        const light = star.brightness > 0.7 ? 52 : 100
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
        ctx.fill()

        // Glow for bright stars
        if (star.brightness > 0.6 && size > 0.8) {
          ctx.beginPath()
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha * 0.1})`
          ctx.fill()
        }
      }

      animFrame = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.8 }}
    />
  )
}

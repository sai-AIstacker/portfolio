"use client"

import { useEffect, useRef, useState } from "react"

interface GalaxyCanvasProps {
  id: string
  withConstellations?: boolean
}

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  dx: number
  dy: number
  connections: Star[]
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  reset: () => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D, animationProgress: number) => void
}

export default function GalaxyCanvas({ id, withConstellations = false }: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationStartTimeRef = useRef<number>(0)
  const requestIdRef = useRef<number>(0)

  // Constants
  const numberOfStars = 350
  const minStarSize = 0.5
  const maxStarSize = 2.0
  const driftSpeed = 0.08
  const maxShootingStars = 5
  const shootingStarInterval = 2000
  const connectionDistance = 100
  const maxConnectionsPerStar = 5
  const glowRadius = 150
  const maxGlowIntensity = 0.8
  const fadeInDuration = 3000

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        initStars()
        initShootingStars()
        animationStartTimeRef.current = performance.now()
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        })
      }
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 })
    }

    // Initialize stars
    const initStars = () => {
      if (!canvas) return

      const stars: Star[] = []
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxStarSize - minStarSize) + minStarSize,
          opacity: Math.random() * 0.6 + 0.4,
          dx: (Math.random() - 0.5) * driftSpeed,
          dy: (Math.random() - 0.5) * driftSpeed,
          connections: [],
        })
      }

      if (withConstellations) {
        stars.forEach((star1) => {
          star1.connections = []
          for (let i = 0; i < stars.length; i++) {
            const star2 = stars[i]
            if (star1 !== star2 && !star1.connections.includes(star2)) {
              const dist = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2))
              if (dist < connectionDistance) {
                if (star1.connections.length < maxConnectionsPerStar) {
                  star1.connections.push(star2)
                }
              }
            }
          }
        })
      }

      starsRef.current = stars
    }

    // Initialize shooting stars
    const initShootingStars = () => {
      if (!canvas) return

      const shootingStars: ShootingStar[] = []
      for (let i = 0; i < maxShootingStars / 2; i++) {
        shootingStars.push(createShootingStar())
      }
      shootingStarsRef.current = shootingStars
    }

    // Create a shooting star
    const createShootingStar = (): ShootingStar => {
      if (!canvas) {
        throw new Error("Canvas not available")
      }

      let x: number, y: number

      if (Math.random() < 0.5) {
        x = -Math.random() * canvas.width * 0.5
        y = Math.random() * canvas.height
      } else {
        x = Math.random() * canvas.width
        y = -Math.random() * canvas.height * 0.5
      }

      const length = Math.random() * 80 + 40
      const speed = Math.random() * 4 + 4
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1)
      const opacity = 1

      const shootingStar: ShootingStar = {
        x,
        y,
        length,
        speed,
        angle,
        opacity,
        reset() {
          if (!canvas) return

          if (Math.random() < 0.5) {
            this.x = -Math.random() * canvas.width * 0.5
            this.y = Math.random() * canvas.height
          } else {
            this.x = Math.random() * canvas.width
            this.y = -Math.random() * canvas.height * 0.5
          }
          this.length = Math.random() * 80 + 40
          this.speed = Math.random() * 4 + 4
          this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1)
          this.opacity = 1
        },
        update() {
          if (!canvas) return

          this.x += Math.cos(this.angle) * this.speed
          this.y += Math.sin(this.angle) * this.speed
          this.opacity -= 0.015

          if (this.x > canvas.width + this.length || this.y > canvas.height + this.length || this.opacity <= 0) {
            this.reset()
          }
        },
        draw(ctx, animationProgress) {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * animationProgress})`
          ctx.lineWidth = 2
          ctx.stroke()
        },
      }

      return shootingStar
    }

    // Draw constellations
    const drawConstellations = (ctx: CanvasRenderingContext2D, animationProgress: number) => {
      if (!canvas) return

      const canvasRect = canvas.getBoundingClientRect()

      starsRef.current.forEach((star1) => {
        star1.connections.forEach((star2) => {
          const dist = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2))
          let opacity = Math.max(0, 1 - dist / connectionDistance)

          const midX = (star1.x + star2.x) / 2
          const midY = (star1.y + star2.y) / 2

          const mouseXRelativeToCanvas = mousePosition.x - canvasRect.left
          const mouseYRelativeToCanvas = mousePosition.y - canvasRect.top

          const distToMouse = Math.sqrt(
            Math.pow(midX - mouseXRelativeToCanvas, 2) + Math.pow(midY - mouseYRelativeToCanvas, 2),
          )

          let glowFactor = 0
          if (distToMouse < glowRadius) {
            glowFactor = (1 - distToMouse / glowRadius) * maxGlowIntensity
          }

          opacity = Math.min(1, opacity + glowFactor) * animationProgress

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(star1.x, star1.y)
          ctx.lineTo(star2.x, star2.y)
          ctx.stroke()
        })
      })
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = performance.now()
      let animationProgress = 1

      if (animationStartTimeRef.current > 0) {
        animationProgress = (currentTime - animationStartTimeRef.current) / fadeInDuration
        animationProgress = Math.min(Math.max(animationProgress, 0), 1)
      }

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update star position
        star.x += star.dx
        star.y += star.dy

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.dx *= -1
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1

        // Add slight randomness to movement
        star.dx += (Math.random() - 0.5) * 0.001
        star.dy += (Math.random() - 0.5) * 0.001

        // Limit speed
        const currentDriftSpeed = Math.sqrt(star.dx * star.dx + star.dy * star.dy)
        if (currentDriftSpeed > driftSpeed) {
          star.dx = (star.dx / currentDriftSpeed) * driftSpeed
          star.dy = (star.dy / currentDriftSpeed) * driftSpeed
        }

        // Draw star
        const canvasRect = canvas.getBoundingClientRect()
        const mouseXRelativeToCanvas = mousePosition.x - canvasRect.left
        const mouseYRelativeToCanvas = mousePosition.y - canvasRect.top

        const distToMouse = Math.sqrt(
          Math.pow(star.x - mouseXRelativeToCanvas, 2) + Math.pow(star.y - mouseYRelativeToCanvas, 2),
        )

        let glowFactor = 0
        if (distToMouse < glowRadius) {
          glowFactor = (1 - distToMouse / glowRadius) * maxGlowIntensity
        }

        const finalOpacity = Math.min(1, star.opacity + glowFactor) * animationProgress

        ctx.shadowBlur = star.size * 5 + glowFactor * 10
        ctx.shadowColor = `rgba(255, 255, 255, ${finalOpacity})`

        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
      })

      // Draw constellations if enabled
      if (withConstellations) {
        drawConstellations(ctx, animationProgress)
      }

      // Handle shooting stars
      const shootingStars = shootingStarsRef.current

      // Add new shooting star if needed
      if (!shootingStars.lastStarTime) {
        shootingStars.lastStarTime = 0
      }

      if (shootingStars.length < maxShootingStars && currentTime - shootingStars.lastStarTime > shootingStarInterval) {
        shootingStarsRef.current.push(createShootingStar())
        shootingStars.lastStarTime = currentTime
      }

      // Update and draw shooting stars
      shootingStars.forEach((star) => {
        star.update()
        star.draw(ctx, animationProgress)
      })

      requestIdRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Initialize
    handleResize()
    animationStartTimeRef.current = performance.now()
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(requestIdRef.current)
    }
  }, [withConstellations])

  return <canvas ref={canvasRef} id={id} className="absolute top-0 left-0 w-full h-full z-0" />
}

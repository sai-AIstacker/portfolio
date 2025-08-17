"use client"

import { useEffect, useState } from "react"

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), rgba(255,255,255,0.08) 30%, transparent 60%)`,
      }}
    />
  )
}

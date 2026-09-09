"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const restartRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const theme = window.matchMedia("(prefers-color-scheme: dark)")
    let frame = 0
    let angle = 0
    let lastTime = 0
    let visible = true
    let width = 0
    let height = 0
    const pointer = { x: 0, y: 0 }
    const rotation = { x: 0, y: 0 }
    // Fibonacci distribution keeps the spherical particle field evenly spaced.
    const points = Array.from({ length: 700 }, (_, i) => {
      const y = 1 - (i / 699) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = i * Math.PI * (3 - Math.sqrt(5))
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius }
    })

    function draw(time: number) {
      if (!canvas || !context) return
      const animate = !pausedRef.current && !motion.matches
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0
      lastTime = time
      if (animate) angle += elapsed * 0.00012
      rotation.x += ((animate ? pointer.x : 0) - rotation.x) * 0.04
      rotation.y += ((animate ? pointer.y : 0) - rotation.y) * 0.04
      context.clearRect(0, 0, width, height)
      const radius = Math.min(width, height) * 0.36
      const yaw = angle + rotation.x
      const pitch = 0.35 + rotation.y
      const dots = points.map((point) => {
        const ripple = 1 + 0.09 * Math.sin(point.y * 7 + angle * 3)
        const x = point.x * Math.cos(yaw) - point.z * Math.sin(yaw)
        const z = point.x * Math.sin(yaw) + point.z * Math.cos(yaw)
        return { x: x * ripple, y: (point.y * Math.cos(pitch) - z * Math.sin(pitch)) * ripple, z: point.y * Math.sin(pitch) + z * Math.cos(pitch) }
      }).sort((a, b) => a.z - b.z)
      for (const point of dots) {
        const depth = (point.z + 1) / 2
        const perspective = 1 + point.z * 0.15
        const accent = theme.matches ? "231,152,119" : "171,77,48"
        const ink = theme.matches ? "200,210,192" : "73,88,66"
        context.fillStyle = `rgba(${point.x > -0.3 ? accent : ink},${0.16 + depth * 0.74})`
        context.beginPath()
        context.arc(width / 2 + point.x * radius * perspective, height / 2 + point.y * radius * perspective, 0.7 + depth * 1.5, 0, Math.PI * 2)
        context.fill()
      }
      if (animate && visible && !document.hidden) frame = requestAnimationFrame(draw)
    }
    function restart() {
      cancelAnimationFrame(frame)
      lastTime = 0
      if (visible && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      restart()
    })
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart() })
    function move(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5
    }
    function leave() { pointer.x = 0; pointer.y = 0 }
    restartRef.current = restart
    resize.observe(canvas)
    observer.observe(canvas)
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerleave", leave)
    motion.addEventListener("change", restart)
    theme.addEventListener("change", restart)
    document.addEventListener("visibilitychange", restart)
    return () => {
      restartRef.current = null
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", leave)
      motion.removeEventListener("change", restart)
      theme.removeEventListener("change", restart)
      document.removeEventListener("visibilitychange", restart)
    }
  }, [])

  return (
    <div className="hero-particles">
      <canvas ref={canvasRef} aria-hidden="true" />
      <button type="button" className="particle-toggle icon-link" onClick={() => { pausedRef.current = !paused; setPaused(!paused); restartRef.current?.() }} aria-label={paused ? "Play particle animation" : "Pause particle animation"} title={paused ? "Play animation" : "Pause animation"}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>
  )
}

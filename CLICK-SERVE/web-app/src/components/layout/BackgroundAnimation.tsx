"use client"

import React, { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    opacity: number
}

export const BackgroundAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: false })
        if (!ctx) return

        let animationFrameId: number
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        let width = window.innerWidth
        let height = window.innerHeight

        // Set canvas size accounting for device pixel ratio
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.scale(dpr, dpr)

        // Reduce particles on mobile for better performance
        const isMobile = width < 768
        const particleCount = isMobile ? 20 : 40
        const particles: Particle[] = []

        // Pre-create the static background gradient (never changes)
        let bgGradient: CanvasGradient

        const createBgGradient = () => {
            bgGradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height)
            )
            bgGradient.addColorStop(0, "#0a192f")
            bgGradient.addColorStop(1, "#020617")
        }

        createBgGradient()

        const createParticle = (): Particle => {
            const opacity = Math.random() * 0.5 + 0.1
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity,
                color: `rgba(250, 204, 21, ${opacity})`,
            }
        }

        // Init particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle())
        }

        // Throttle to ~30fps for ambient animation (saves ~50% GPU)
        const targetFPS = 30
        const frameInterval = 1000 / targetFPS
        let lastFrameTime = 0

        const animate = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(animate)

            const delta = timestamp - lastFrameTime
            if (delta < frameInterval) return
            lastFrameTime = timestamp - (delta % frameInterval)

            // Draw cached background gradient
            ctx.fillStyle = bgGradient
            ctx.fillRect(0, 0, width, height)

            // Draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                p.x += p.speedX
                p.y += p.speedY

                if (p.x > width) p.x = 0
                else if (p.x < 0) p.x = width
                if (p.y > height) p.y = 0
                else if (p.y < 0) p.y = height

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()
            }

            // Floating glass effect zones
            ctx.save()
            ctx.globalCompositeOperation = "screen"
            const time = timestamp * 0.0005
            const blobCount = isMobile ? 2 : 3
            for (let i = 0; i < blobCount; i++) {
                const x = width * (0.5 + Math.cos(time + i) * 0.3)
                const y = height * (0.5 + Math.sin(time * 0.8 + i) * 0.3)
                const radius = Math.min(width, height) * 0.4
                const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
                blobGradient.addColorStop(0, "rgba(250, 204, 21, 0.05)")
                blobGradient.addColorStop(1, "rgba(250, 204, 21, 0)")
                ctx.fillStyle = blobGradient
                ctx.beginPath()
                ctx.arc(x, y, radius, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.restore()
        }

        let resizeTimeout: ReturnType<typeof setTimeout>
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                width = window.innerWidth
                height = window.innerHeight
                canvas.width = width * dpr
                canvas.height = height * dpr
                canvas.style.width = `${width}px`
                canvas.style.height = `${height}px`
                ctx.scale(dpr, dpr)
                createBgGradient()
            }, 150)
        }

        window.addEventListener("resize", handleResize)
        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
            clearTimeout(resizeTimeout)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
            style={{ willChange: "contents" }}
        />
    )
}

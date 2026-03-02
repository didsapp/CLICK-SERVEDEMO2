"use client"

import React, { useEffect, useRef } from "react"

export const BackgroundAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const particles: Particle[] = []
        const particleCount = 40

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            opacity: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.size = Math.random() * 2 + 1
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.opacity = Math.random() * 0.5 + 0.1
                this.color = `rgba(250, 204, 21, ${this.opacity})` // SkyWhale Yellow
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > width) this.x = 0
                else if (this.x < 0) this.x = width
                if (this.y > height) this.y = 0
                else if (this.y < 0) this.y = height
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw gradient background
            const gradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height)
            )
            gradient.addColorStop(0, "#0a192f") // Deep Dark Blue
            gradient.addColorStop(1, "#020617") // Almost Black
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Draw particles
            particles.forEach((particle) => {
                particle.update()
                particle.draw()
            })

            // Add floating glass effect zones
            ctx.save()
            ctx.globalCompositeOperation = "screen"
            const time = Date.now() * 0.0005
            for (let i = 0; i < 3; i++) {
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

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        init()
        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        />
    )
}

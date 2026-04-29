"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"

const EMOJIS = ["🎉","🎊","✨","💫","🌟","🔥","🚀","🌈","💥","🍾","🥳","😄","😆","😁","😂","🤣","😊","😇","🙂","😉"]

export default function EmojiRainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const container = containerRef.current
      if (!container) return

      const el = document.createElement("div")
      el.setAttribute("aria-hidden", "true")
      el.className = "roe-emoji"
      el.style.left = `${Math.random() * 100}%`
      el.style.fontSize = `${Math.random() * 24 + 24}px`
      const duration = Math.random() * 3 + 3
      el.style.animationDuration = `${duration}s`
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)] ?? "🎉"
      container.appendChild(el)
      setTimeout(() => el.remove(), duration * 1000 + 200)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden bg-gray-950">
        <Link
          href="/playground"
          className="fixed top-4 left-4 z-10 text-white/60 hover:text-white text-sm transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
        >
          ← Back
        </Link>
      </div>
      <style>{`
        @keyframes roe-fall {
          from { transform: translateX(-50%) translateY(-100%); }
          to   { transform: translateX(-50%) translateY(100vh); }
        }
        .roe-emoji {
          position: absolute;
          top: 0;
          user-select: none;
          pointer-events: none;
          will-change: transform;
          animation: roe-fall linear forwards;
        }
      `}</style>
    </>
  )
}

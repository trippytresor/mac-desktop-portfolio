"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  SkipForward,
  SkipBack,
} from "lucide-react"

interface ShowreelSlide {
  title: string
  subtitle: string
  gradient: string
  shapes: { type: "circle" | "square" | "ring"; size: number; x: number; y: number; delay: number }[]
}

const slides: ShowreelSlide[] = [
  {
    title: "John Doe",
    subtitle: "Motion Designer & Creative Developer",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    shapes: [
      { type: "ring", size: 200, x: 15, y: 20, delay: 0 },
      { type: "circle", size: 80, x: 75, y: 60, delay: 0.3 },
      { type: "square", size: 60, x: 85, y: 15, delay: 0.6 },
    ],
  },
  {
    title: "Fluid Interfaces",
    subtitle: "Micro-interactions for fintech applications",
    gradient: "from-violet-900 via-fuchsia-900 to-violet-900",
    shapes: [
      { type: "circle", size: 150, x: 10, y: 30, delay: 0 },
      { type: "ring", size: 120, x: 80, y: 50, delay: 0.2 },
      { type: "square", size: 40, x: 50, y: 10, delay: 0.5 },
    ],
  },
  {
    title: "Brand Reveal",
    subtitle: "Logo animation & 3D identity systems",
    gradient: "from-amber-900 via-orange-900 to-amber-900",
    shapes: [
      { type: "square", size: 100, x: 20, y: 40, delay: 0 },
      { type: "ring", size: 180, x: 70, y: 20, delay: 0.3 },
      { type: "circle", size: 60, x: 40, y: 70, delay: 0.6 },
    ],
  },
  {
    title: "Data Viz Motion",
    subtitle: "Animated infographics & data storytelling",
    gradient: "from-emerald-900 via-teal-900 to-emerald-900",
    shapes: [
      { type: "ring", size: 160, x: 80, y: 30, delay: 0 },
      { type: "circle", size: 90, x: 15, y: 60, delay: 0.4 },
      { type: "square", size: 50, x: 50, y: 15, delay: 0.2 },
    ],
  },
  {
    title: "Product Launch",
    subtitle: "3D renders & kinetic typography",
    gradient: "from-rose-900 via-red-900 to-rose-900",
    shapes: [
      { type: "circle", size: 120, x: 25, y: 25, delay: 0.1 },
      { type: "square", size: 80, x: 65, y: 55, delay: 0 },
      { type: "ring", size: 140, x: 50, y: 40, delay: 0.3 },
    ],
  },
  {
    title: "Let's Work Together",
    subtitle: "hello@johndoe.dev",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    shapes: [
      { type: "ring", size: 240, x: 50, y: 40, delay: 0 },
      { type: "circle", size: 40, x: 20, y: 70, delay: 0.5 },
      { type: "circle", size: 40, x: 80, y: 70, delay: 0.5 },
    ],
  },
]

const SLIDE_DURATION = 4000

function Shape({
  shape,
  isPlaying,
}: {
  shape: ShowreelSlide["shapes"][0]
  isPlaying: boolean
}) {
  const base =
    "absolute transition-all duration-1000 ease-out"

  const style: React.CSSProperties = {
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    width: shape.size,
    height: shape.size,
    transform: `translate(-50%, -50%)`,
    animationDelay: `${shape.delay}s`,
    opacity: isPlaying ? 0.15 : 0.08,
  }

  if (shape.type === "circle") {
    return (
      <div
        className={`${base} rounded-full ${isPlaying ? "animate-pulse" : ""}`}
        style={{
          ...style,
          background: "hsla(0, 0%, 100%, 0.12)",
        }}
      />
    )
  }

  if (shape.type === "ring") {
    return (
      <div
        className={`${base} rounded-full ${isPlaying ? "animate-[spin_12s_linear_infinite]" : ""}`}
        style={{
          ...style,
          border: "2px solid hsla(0, 0%, 100%, 0.15)",
          background: "transparent",
        }}
      />
    )
  }

  return (
    <div
      className={`${base} rounded-lg ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""}`}
      style={{
        ...style,
        background: "hsla(0, 0%, 100%, 0.1)",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
    />
  )
}

export function ShowreelApp() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [slideTransition, setSlideTransition] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slide = slides[currentSlide]

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
  }, [])

  const startAutoPlay = useCallback(() => {
    clearTimers()
    setProgress(0)
    const startTime = Date.now()

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100))
    }, 50)

    timerRef.current = setInterval(() => {
      setSlideTransition(false)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setSlideTransition(true)
        setProgress(0)
      }, 300)

      clearTimers()
      // Restart after transition
      setTimeout(() => {
        if (timerRef.current === null && progressRef.current === null) {
          // Will be restarted by the effect below
        }
      }, 400)
    }, SLIDE_DURATION)
  }, [clearTimers])

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay()
    } else {
      clearTimers()
    }
    return clearTimers
  }, [isPlaying, currentSlide, startAutoPlay, clearTimers])

  const goToSlide = (index: number) => {
    setSlideTransition(false)
    setTimeout(() => {
      setCurrentSlide(index)
      setSlideTransition(true)
      setProgress(0)
    }, 200)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)

  return (
    <div className="flex h-full flex-col" style={{ background: "hsl(220, 20%, 6%)" }}>
      {/* Video area */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-500 ${
            slideTransition ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background shapes */}
          {slide.shapes.map((shape, i) => (
            <Shape key={`${currentSlide}-${i}`} shape={shape} isPlaying={isPlaying} />
          ))}

          {/* Content */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-700 ${
              slideTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1
              className="text-4xl font-bold tracking-tight text-white text-center px-8"
              style={{ textShadow: "0 2px 20px hsla(0,0%,0%,0.4)" }}
            >
              {slide.title}
            </h1>
            <p
              className="text-base text-white/70 font-medium tracking-wide text-center px-8"
            >
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Slide counter */}
        <div
          className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium text-white/70"
          style={{ background: "hsla(0,0%,0%,0.4)", backdropFilter: "blur(8px)" }}
        >
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 px-4 pt-3" role="progressbar" aria-label="Showreel progress">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative h-1 flex-1 rounded-full overflow-hidden cursor-pointer"
            style={{ background: "hsla(0, 0%, 100%, 0.15)" }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width:
                  i < currentSlide
                    ? "100%"
                    : i === currentSlide
                    ? `${progress}%`
                    : "0%",
                background: i <= currentSlide ? "hsla(0, 0%, 100%, 0.7)" : "transparent",
                transition: i === currentSlide ? "width 50ms linear" : "width 300ms ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white/50" />
            ) : (
              <Volume2 className="h-4 w-4 text-white/70" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous slide"
          >
            <SkipBack className="h-4 w-4 text-white/70" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
            style={{ background: "hsla(0, 0%, 100%, 0.15)" }}
            aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </button>
          <button
            onClick={nextSlide}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next slide"
          >
            <SkipForward className="h-4 w-4 text-white/70" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4 text-white/50" />
          </button>
        </div>
      </div>
    </div>
  )
}

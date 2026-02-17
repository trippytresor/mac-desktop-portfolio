"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { MenuBar } from "./menu-bar"
import { Dock, type AppId } from "./dock"
import { Window } from "./window"
import { AboutApp } from "./apps/about-app"
import { ProjectsApp } from "./apps/projects-app"
import { ContactApp } from "./apps/contact-app"
import { ResumeApp } from "./apps/resume-app"
import { TerminalApp } from "./apps/terminal-app"
import { BrowserApp } from "./apps/browser-app"
import { SettingsApp } from "./apps/settings-app"
import { MotionApp } from "./apps/motion-app"
import { ShowreelApp } from "./apps/showreel-app"
import { PhotosApp } from "./apps/photos-app"
import {
  User,
  FolderOpen,
  FileText,
  Mail,
  HardDrive,
  Clapperboard,
  Film,
} from "lucide-react"

interface WindowState {
  id: AppId
  title: string
  zIndex: number
  isMinimized: boolean
}

const APP_CONFIG: Record<
  AppId,
  {
    title: string
    component: React.ReactNode
    defaultSize: { width: number; height: number }
    defaultPosition: { x: number; y: number }
  }
> = {
  about: {
    title: "About Me",
    component: <AboutApp />,
    defaultSize: { width: 760, height: 520 },
    defaultPosition: { x: 80, y: 60 },
  },
  projects: {
    title: "Projects",
    component: <ProjectsApp />,
    defaultSize: { width: 720, height: 540 },
    defaultPosition: { x: 140, y: 80 },
  },
  contact: {
    title: "Contact",
    component: <ContactApp />,
    defaultSize: { width: 680, height: 480 },
    defaultPosition: { x: 200, y: 100 },
  },
  resume: {
    title: "Resume Preview",
    component: <ResumeApp />,
    defaultSize: { width: 640, height: 560 },
    defaultPosition: { x: 260, y: 50 },
  },
  terminal: {
    title: "Terminal",
    component: <TerminalApp />,
    defaultSize: { width: 640, height: 420 },
    defaultPosition: { x: 180, y: 120 },
  },
  browser: {
    title: "Safari - treasure.lab",
    component: <BrowserApp />,
    defaultSize: { width: 800, height: 560 },
    defaultPosition: { x: 120, y: 50 },
  },
  settings: {
    title: "System Settings",
    component: <SettingsApp />,
    defaultSize: { width: 740, height: 500 },
    defaultPosition: { x: 160, y: 70 },
  },
  motion: {
    title: "Motion Design",
    component: <MotionApp />,
    defaultSize: { width: 820, height: 580 },
    defaultPosition: { x: 80, y: 50 },
  },
  showreel: {
    title: "Showreel 2024",
    component: <ShowreelApp />,
    defaultSize: { width: 680, height: 460 },
    defaultPosition: { x: 180, y: 80 },
  },
  photos: {
    title: "Photos",
    component: <PhotosApp />,
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 100, y: 40 },
  },
}

const INITIAL_DESKTOP_ICONS: { id: AppId; label: string; icon: React.ReactNode; defaultPos: { x: number; y: number } }[] = [
  {
    id: "showreel",
    label: "Showreel",
    icon: <Film className="h-8 w-8" />,
    defaultPos: { x: -100, y: 40 },
  },
  {
    id: "motion",
    label: "Motion Design",
    icon: <Clapperboard className="h-8 w-8" />,
    defaultPos: { x: -100, y: 130 },
  },
  {
    id: "about",
    label: "About Me",
    icon: <User className="h-8 w-8" />,
    defaultPos: { x: -100, y: 220 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="h-8 w-8" />,
    defaultPos: { x: -100, y: 310 },
  },
  {
    id: "resume",
    label: "Resume.pdf",
    icon: <FileText className="h-8 w-8" />,
    defaultPos: { x: -100, y: 400 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-8 w-8" />,
    defaultPos: { x: -100, y: 490 },
  },
  {
    id: "browser",
    label: "Macintosh HD",
    icon: <HardDrive className="h-8 w-8" />,
    defaultPos: { x: -100, y: 580 },
  },
]

function DraggableIcon({
  id,
  label,
  icon,
  defaultPos,
  isSelected,
  onOpen,
  onSelect,
}: {
  id: AppId
  label: string
  icon: React.ReactNode
  defaultPos: { x: number; y: number }
  isSelected: boolean
  onOpen: (id: AppId) => void
  onSelect: (id: AppId) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(defaultPos)
  const dragState = useRef({ isDragging: false, hasMoved: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 })

  // Resolve positions relative to viewport width on mount
  useEffect(() => {
    if (defaultPos.x < 0) {
      setPos({ x: window.innerWidth + defaultPos.x, y: defaultPos.y })
    }
  }, [defaultPos])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return
      const dx = e.clientX - dragState.current.startX
      const dy = e.clientY - dragState.current.startY
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragState.current.hasMoved = true
      }

      const newX = dragState.current.startPosX + dx
      const newY = dragState.current.startPosY + dy

      // Clamp to viewport, keeping icons fully visible
      // Assuming icon width is approx 80px and height is approx 100px (including label)
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 80))
      const clampedY = Math.max(28, Math.min(newY, window.innerHeight - 180)) // Account for dock height (~80px) + icon height

      setPos({
        x: clampedX,
        y: clampedY,
      })
    }
    const handleUp = () => {
      dragState.current.isDragging = false
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect(id)
    dragState.current = {
      isDragging: true,
      hasMoved: false,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!dragState.current.hasMoved) {
      onOpen(id)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`absolute flex flex-col items-center gap-1 rounded-lg p-2 transition-colors w-20 cursor-default z-[1] ${
        isSelected ? "bg-white/30" : "hover:bg-white/20"
      }`}
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      data-testid={`icon-${id}`}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl text-white"
        style={{
          background: "hsla(0, 0%, 100%, 0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        {icon}
      </div>
      <span
        className="text-[11px] font-medium text-center leading-tight text-white"
        style={{ textShadow: "0 1px 3px hsla(0,0%,0%,0.5)" }}
      >
        {label}
      </span>
    </div>
  )
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "showreel", title: APP_CONFIG.showreel.title, zIndex: 10, isMinimized: false },
  ])
  const [nextZIndex, setNextZIndex] = useState(11)
  const [selectedIconId, setSelectedIconId] = useState<AppId | null>(null)

  const activeWindows = windows.filter(w => !w.isMinimized)
  const activeApp = activeWindows.length > 0
    ? APP_CONFIG[activeWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id]?.title || "Finder"
    : "Finder"

  const openWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const exists = prev.find((w) => w.id === id)
        if (exists) {
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
          )
        }
        return [
          ...prev,
          {
            id,
            title: APP_CONFIG[id].title,
            zIndex: nextZIndex,
            isMinimized: false,
          },
        ]
      })
      setNextZIndex((z) => z + 1)
    },
    [nextZIndex]
  )

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const focusWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
        )
      )
      setNextZIndex((z) => z + 1)
    },
    [nextZIndex]
  )

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wallpaper.png')" }}
        aria-hidden="true"
      />

      {/* Menu Bar */}
      <MenuBar activeApp={activeApp} />

      {/* Desktop Icons (draggable) */}
      <div
        className="absolute inset-0"
        onMouseDown={() => setSelectedIconId(null)}
      >
        {INITIAL_DESKTOP_ICONS.map((item) => (
          <DraggableIcon
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            defaultPos={item.defaultPos}
            isSelected={selectedIconId === item.id}
            onOpen={openWindow}
            onSelect={setSelectedIconId}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((win) => {
        const config = APP_CONFIG[win.id]
        const isActive =
          !win.isMinimized &&
          win.zIndex === Math.max(...windows.filter(w => !w.isMinimized).map((w) => w.zIndex))

        return (
          <Window
            key={win.id}
            id={win.id}
            title={config.title}
            isActive={isActive}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            defaultPosition={config.defaultPosition}
            defaultSize={config.defaultSize}
          >
            {config.component}
          </Window>
        )
      })}

      {/* Dock */}
      <Dock
        openWindows={windows.map((w) => w.id)}
        onOpen={openWindow}
      />
    </div>
  )
}

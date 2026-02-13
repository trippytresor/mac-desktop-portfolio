"use client"

import { useState, useCallback } from "react"
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
import {
  User,
  FolderOpen,
  FileText,
  Mail,
  HardDrive,
} from "lucide-react"

interface WindowState {
  id: AppId
  title: string
  zIndex: number
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
    title: "Safari - johndoe.dev",
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
}

const DESKTOP_ICONS: { id: AppId; label: string; icon: React.ReactNode }[] = [
  {
    id: "about",
    label: "About Me",
    icon: <User className="h-8 w-8" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="h-8 w-8" />,
  },
  {
    id: "resume",
    label: "Resume.pdf",
    icon: <FileText className="h-8 w-8" />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-8 w-8" />,
  },
  {
    id: "browser",
    label: "Macintosh HD",
    icon: <HardDrive className="h-8 w-8" />,
  },
]

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(10)

  const activeApp = windows.length > 0
    ? APP_CONFIG[windows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id]?.title || "Finder"
    : "Finder"

  const openWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const exists = prev.find((w) => w.id === id)
        if (exists) {
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: nextZIndex } : w
          )
        }
        return [
          ...prev,
          {
            id,
            title: APP_CONFIG[id].title,
            zIndex: nextZIndex,
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
          w.id === id ? { ...w, zIndex: nextZIndex } : w
        )
      )
      setNextZIndex((z) => z + 1)
    },
    [nextZIndex]
  )

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
        aria-hidden="true"
      />

      {/* Menu Bar */}
      <MenuBar activeApp={activeApp} />

      {/* Desktop Icons */}
      <div className="absolute right-4 top-10 flex flex-col gap-2 z-[1]">
        {DESKTOP_ICONS.map((item) => (
          <button
            key={item.id}
            onDoubleClick={() => openWindow(item.id)}
            className="group flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-white/20 transition-colors w-20"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl text-white"
              style={{
                background: "hsla(0, 0%, 100%, 0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              {item.icon}
            </div>
            <span
              className="text-[11px] font-medium text-center leading-tight text-white"
              style={{ textShadow: "0 1px 3px hsla(0,0%,0%,0.5)" }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((win) => {
        const config = APP_CONFIG[win.id]
        const isActive =
          win.zIndex ===
          Math.max(...windows.map((w) => w.zIndex))
        return (
          <Window
            key={win.id}
            id={win.id}
            title={config.title}
            isActive={isActive}
            zIndex={win.zIndex}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
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

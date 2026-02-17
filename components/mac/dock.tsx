"use client"

import { useState } from "react"
import {
  User,
  FolderOpen,
  Mail,
  FileText,
  Terminal,
  Globe,
  Settings,
  Clapperboard,
  Film,
  Instagram,
  Image,
} from "lucide-react"

export type AppId = "about" | "projects" | "contact" | "resume" | "terminal" | "browser" | "settings" | "motion" | "showreel" | "instagram" | "photos"

interface DockItem {
  id: AppId
  label: string
  icon: React.ReactNode
  color: string
  url?: string
}

const dockItems: DockItem[] = [
  {
    id: "showreel",
    label: "Showreel",
    icon: <Film className="h-6 w-6" />,
    color: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  {
    id: "about",
    label: "About Me",
    icon: <User className="h-6 w-6" />,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="h-6 w-6" />,
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
  },
  {
    id: "resume",
    label: "Resume",
    icon: <FileText className="h-6 w-6" />,
    color: "bg-gradient-to-br from-orange-400 to-red-500",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-6 w-6" />,
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <Terminal className="h-6 w-6" />,
    color: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "browser",
    label: "Browser",
    icon: <Globe className="h-6 w-6" />,
    color: "bg-gradient-to-br from-sky-400 to-indigo-500",
  },
  {
    id: "motion",
    label: "Motion Design",
    icon: <Clapperboard className="h-6 w-6" />,
    color: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-6 w-6" />,
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
  },
  {
    id: "photos",
    label: "Photos",
    icon: <Image className="h-6 w-6" />,
    color: "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    color: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    url: "https://www.instagram.com/treasures.lab/",
  },
]

interface DockProps {
  openWindows: AppId[]
  onOpen: (id: AppId) => void
}

export function Dock({ openWindows, onOpen }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const diff = Math.abs(index - hoveredIndex)
    if (diff === 0) return 1.5
    if (diff === 1) return 1.25
    if (diff === 2) return 1.1
    return 1
  }

  return (
    <nav
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex items-end gap-1 rounded-2xl px-2 pb-1.5 pt-1.5"
      style={{
        background: "hsla(0, 0%, 100%, 0.55)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid hsla(0, 0%, 100%, 0.4)",
        boxShadow: "0 8px 32px hsla(0,0%,0%,0.12), 0 2px 8px hsla(0,0%,0%,0.08)",
      }}
      aria-label="Application dock"
    >
      {dockItems.map((item, index) => {
        const scale = getScale(index)
        const isOpen = openWindows.includes(item.id)
        return (
          <div
            key={item.id}
            className="flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <div
                className="absolute -top-8 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap"
                style={{
                  background: "hsla(220, 9%, 12%, 0.85)",
                  color: "hsl(0, 0%, 95%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {item.label}
              </div>
            )}
            <button
              onClick={() => {
                if (item.url) {
                  window.open(item.url, "_blank")
                } else {
                  onOpen(item.id)
                }
              }}
              className={`${item.color} relative flex items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-200 ease-out cursor-default`}
              style={{
                width: `${44 * scale}px`,
                height: `${44 * scale}px`,
                marginBottom: `${(scale - 1) * 22}px`,
                transformOrigin: "bottom",
              }}
              aria-label={`Open ${item.label}`}
            >
              {item.icon}
            </button>
            <div
              className={`h-1 w-1 rounded-full transition-opacity duration-200 ${
                isOpen ? "bg-foreground/60 opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )
      })}
    </nav>
  )
}

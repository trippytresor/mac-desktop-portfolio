"use client"

import { useState } from "react"
import {
  Wifi,
  Bluetooth,
  Sun,
  Volume2,
  Globe,
  Shield,
  HardDrive,
  MonitorSmartphone,
  Bell,
  Palette,
} from "lucide-react"

const CATEGORIES = [
  { icon: <Wifi className="h-4 w-4" />, label: "Wi-Fi", color: "bg-blue-500" },
  { icon: <Bluetooth className="h-4 w-4" />, label: "Bluetooth", color: "bg-blue-500" },
  { icon: <Globe className="h-4 w-4" />, label: "Network", color: "bg-blue-500" },
  { icon: <Bell className="h-4 w-4" />, label: "Notifications", color: "bg-red-500" },
  { icon: <Volume2 className="h-4 w-4" />, label: "Sound", color: "bg-pink-500" },
  { icon: <Sun className="h-4 w-4" />, label: "Displays", color: "bg-blue-400" },
  { icon: <Palette className="h-4 w-4" />, label: "Appearance", color: "bg-indigo-500" },
  { icon: <Shield className="h-4 w-4" />, label: "Privacy", color: "bg-gray-500" },
  { icon: <HardDrive className="h-4 w-4" />, label: "Storage", color: "bg-gray-400" },
]

export function SettingsApp() {
  const [activeCategory, setActiveCategory] = useState("Appearance")
  const [theme, setTheme] = useState("Light")
  const [accentColor, setAccentColor] = useState("hsl(211, 100%, 50%)")

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className="flex w-52 flex-shrink-0 flex-col gap-0.5 overflow-auto p-2 backdrop-blur-md"
        style={{
          background: "hsla(220, 14%, 96%, 0.7)",
          borderRight: "1px solid hsla(220, 13%, 80%, 0.4)"
        }}
      >
        {/* Search */}
        <div
          className="mx-1 mb-3 mt-1 flex items-center gap-2 rounded-lg px-2 py-1"
          style={{ background: "hsla(0, 0%, 0%, 0.05)", border: "0.5px solid hsla(0, 0%, 0%, 0.1)" }}
        >
          <svg className="h-3.5 w-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-[13px] opacity-40">
            Search
          </span>
        </div>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] transition-all ${
              activeCategory === cat.label ? "" : "hover:bg-black/5 active:bg-black/10"
            }`}
            style={
              activeCategory === cat.label
                ? { background: "hsl(211, 100%, 50%)", color: "white" }
                : { color: "hsl(220, 9%, 20%)" }
            }
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded ${
                activeCategory === cat.label ? "bg-white/20" : cat.color
              }`}
            >
              <div className="text-white" style={{ transform: "scale(0.7)" }}>
                {cat.icon}
              </div>
            </div>
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {activeCategory === "Appearance" ? (
          <>
        <h1 className="mb-6 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
          Appearance
        </h1>

        {/* Theme selection */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
            Appearance
          </h2>
          <div className="flex gap-4">
            {[
              { label: "Light", bg: "hsl(220, 14%, 96%)" },
              { label: "Dark", bg: "hsl(220, 14%, 14%)" },
              { label: "Auto", bg: "linear-gradient(135deg, hsl(220, 14%, 96%) 50%, hsl(220, 14%, 14%) 50%)" },
            ].map((t) => (
              <button key={t.label} onClick={() => setTheme(t.label)} className="flex flex-col items-center gap-2">
                <div
                  className={`h-16 w-24 rounded-lg transition-all ${
                    theme === t.label ? "ring-2" : "hover:scale-105"
                  }`}
                  style={{
                    background: t.bg,
                    border: "1px solid hsl(220, 13%, 82%)",
                    borderColor: theme === t.label ? accentColor : "hsl(220, 13%, 82%)",
                    boxShadow: theme === t.label ? `0 0 0 2px ${accentColor}` : "none",
                  }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: theme === t.label ? accentColor : "hsl(220, 9%, 46%)",
                  }}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Accent color */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
            Accent Color
          </h2>
          <div className="flex gap-2">
            {[
              "hsl(211, 100%, 50%)",
              "hsl(262, 83%, 58%)",
              "hsl(340, 82%, 52%)",
              "hsl(25, 95%, 53%)",
              "hsl(48, 96%, 53%)",
              "hsl(142, 71%, 45%)",
              "hsl(220, 9%, 46%)",
            ].map((c) => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                  accentColor === c ? "ring-2 ring-offset-2" : ""
                }`}
                style={{
                  background: c,
                  boxShadow: accentColor === c ? `0 0 0 2px ${c}` : "none",
                }}
                aria-label={`Select accent color`}
              />
            ))}
          </div>
        </section>

        {/* Wallpaper preview */}
        <section>
          <h2 className="mb-3 text-sm font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
            Wallpaper
          </h2>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-16 w-24 rounded-lg transition-transform hover:scale-105 ${
                  i === 1 ? "ring-2" : ""
                }`}
                style={{
                  background:
                    i === 1
                      ? "linear-gradient(135deg, hsl(211, 80%, 50%), hsl(180, 60%, 50%), hsl(30, 90%, 55%))"
                      : i === 2
                      ? "linear-gradient(135deg, hsl(262, 60%, 45%), hsl(280, 70%, 60%))"
                      : i === 3
                      ? "linear-gradient(135deg, hsl(200, 70%, 40%), hsl(220, 80%, 60%))"
                      : "linear-gradient(135deg, hsl(340, 60%, 45%), hsl(20, 90%, 55%))",
                  border: "1px solid hsl(220, 13%, 82%)",
                  boxShadow: i === 1 ? `0 0 0 2px ${accentColor}` : "none",
                }}
              />
            ))}
          </div>
        </section>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
               {CATEGORIES.find(c => c.label === activeCategory)?.icon}
            </div>
            <h2 className="text-lg font-semibold">{activeCategory}</h2>
            <p className="max-w-xs text-sm mt-1">
              Settings for {activeCategory} are coming soon in a future update.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

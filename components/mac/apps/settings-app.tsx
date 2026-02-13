"use client"

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
  { icon: <MonitorSmartphone className="h-4 w-4" />, label: "Displays", color: "bg-blue-500" },
]

export function SettingsApp() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className="flex w-52 flex-shrink-0 flex-col gap-0.5 overflow-auto p-2"
        style={{ background: "hsl(220, 14%, 96%)", borderRight: "1px solid hsl(220, 13%, 88%)" }}
      >
        {/* Search */}
        <div
          className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5"
          style={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 85%)" }}
        >
          <svg className="h-3.5 w-3.5" style={{ color: "hsl(220, 9%, 60%)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-xs" style={{ color: "hsl(220, 9%, 55%)" }}>
            Search
          </span>
        </div>

        {CATEGORIES.map((cat, i) => (
          <button
            key={`${cat.label}-${i}`}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors ${
              i === 6 ? "font-medium" : ""
            }`}
            style={
              i === 6
                ? { background: "hsl(211, 100%, 50%)", color: "white" }
                : { color: "hsl(220, 9%, 30%)" }
            }
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded ${
                i === 6 ? "bg-white/20" : cat.color
              }`}
            >
              <div className={i === 6 ? "text-white" : "text-white"} style={{ transform: "scale(0.7)" }}>
                {cat.icon}
              </div>
            </div>
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Appearance settings */}
      <main className="flex-1 overflow-auto p-6">
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
              { label: "Light", selected: true, bg: "hsl(220, 14%, 96%)" },
              { label: "Dark", selected: false, bg: "hsl(220, 14%, 14%)" },
              { label: "Auto", selected: false, bg: "linear-gradient(135deg, hsl(220, 14%, 96%) 50%, hsl(220, 14%, 14%) 50%)" },
            ].map((theme) => (
              <button key={theme.label} className="flex flex-col items-center gap-2">
                <div
                  className={`h-16 w-24 rounded-lg ${
                    theme.selected ? "ring-2" : ""
                  }`}
                  style={{
                    background: theme.bg,
                    border: "1px solid hsl(220, 13%, 82%)",
                    ringColor: "hsl(211, 100%, 50%)",
                  }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: theme.selected ? "hsl(211, 100%, 50%)" : "hsl(220, 9%, 46%)",
                  }}
                >
                  {theme.label}
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
              { color: "hsl(211, 100%, 50%)", selected: true },
              { color: "hsl(262, 83%, 58%)", selected: false },
              { color: "hsl(340, 82%, 52%)", selected: false },
              { color: "hsl(25, 95%, 53%)", selected: false },
              { color: "hsl(48, 96%, 53%)", selected: false },
              { color: "hsl(142, 71%, 45%)", selected: false },
              { color: "hsl(220, 9%, 46%)", selected: false },
            ].map((c) => (
              <button
                key={c.color}
                className={`h-6 w-6 rounded-full ${
                  c.selected ? "ring-2 ring-offset-2" : ""
                }`}
                style={{
                  background: c.color,
                  ringColor: c.color,
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
                className={`h-16 w-24 rounded-lg ${
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
                  ringColor: "hsl(211, 100%, 50%)",
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

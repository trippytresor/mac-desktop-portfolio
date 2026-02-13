"use client"

import { useState, useEffect } from "react"
import {
  Apple,
  Wifi,
  Battery,
  Search,
  BellRing,
} from "lucide-react"

export function MenuBar({ activeApp }: { activeApp: string }) {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-7 items-center justify-between px-4 text-[13px] font-medium backdrop-blur-2xl"
      style={{
        background: "hsla(0, 0%, 100%, 0.72)",
        borderBottom: "1px solid hsla(220, 13%, 82%, 0.5)",
        color: "hsl(220, 9%, 12%)",
      }}
      role="menubar"
      aria-label="Menu bar"
    >
      <div className="flex items-center gap-4">
        <Apple className="h-3.5 w-3.5" />
        <span className="font-semibold">{activeApp}</span>
        <nav className="flex items-center gap-3 text-muted-foreground">
          <span className="cursor-default hover:text-foreground transition-colors">File</span>
          <span className="cursor-default hover:text-foreground transition-colors">Edit</span>
          <span className="cursor-default hover:text-foreground transition-colors">View</span>
          <span className="cursor-default hover:text-foreground transition-colors">Window</span>
          <span className="cursor-default hover:text-foreground transition-colors">Help</span>
        </nav>
      </div>
      <div className="flex items-center gap-3 text-foreground">
        <BellRing className="h-3.5 w-3.5 opacity-70" />
        <Wifi className="h-3.5 w-3.5 opacity-70" />
        <Search className="h-3.5 w-3.5 opacity-70" />
        <Battery className="h-4 w-4 opacity-70" />
        <span className="tabular-nums text-xs opacity-80">
          {date} {time}
        </span>
      </div>
    </header>
  )
}

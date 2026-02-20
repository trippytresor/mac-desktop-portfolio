"use client"

import { useState, useEffect } from "react"
import {
  Apple,
  Wifi,
  Battery,
  Search,
  BellRing,
} from "lucide-react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils"

const MENU_MAP: Record<string, string[]> = {
  "Finder": ["Projects", "Edit", "View", "Go", "Window"],
  "About Me": ["Projects", "Edit", "View", "Window"],
  "Projects": ["Projects", "Edit", "View", "Go", "Window"],
  "Contact": ["Projects", "Edit", "View", "Window"],
  "Resume Preview": ["Projects", "Edit", "View", "Window"],
  "Terminal": ["Shell", "Edit", "View", "Window"],
  "Safari - treasure.lab": ["Projects", "Edit", "View", "History", "Bookmarks", "Window"],
  "System Settings": ["View", "Edit", "Window"],
  "Motion Design": ["Projects", "Edit", "Object", "View", "Window"],
  "Showreel 2024": ["Projects", "Edit", "View", "Window"],
  "Photos": ["Projects", "Edit", "View", "Window"],
}

const MENU_CONTENT: Record<string, string[]> = {
  "Projects": ["Portfolio Website", "Motion Graphics Showreel", "Brand Identity"],
  "Edit": ["CV", "Contact", "Blog"],
  "View": ["Photo Gallery"],
}

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

  const menus = MENU_MAP[activeApp] || ["Projects", "Edit", "View", "Window"]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-7 items-center justify-between px-2 text-[13px] font-medium backdrop-blur-2xl"
      style={{
        background: "hsla(0, 0%, 100%, 0.72)",
        borderBottom: "1px solid hsla(220, 13%, 82%, 0.5)",
        color: "hsl(220, 9%, 12%)",
      }}
      role="menubar"
      aria-label="Menu bar"
    >
      <div className="flex items-center">
        <Menubar className="h-full border-none bg-transparent p-0 shadow-none space-x-0">
          <MenubarMenu>
            <MenubarTrigger className="h-7 px-3 py-0 data-[state=open]:bg-black/10 focus:bg-transparent hover:bg-black/5 rounded-none">
              <Apple className="h-3.5 w-3.5" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About This Mac</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>System Settings...</MenubarItem>
              <MenubarItem>App Store...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Shut Down...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 px-3 py-0 font-bold data-[state=open]:bg-black/10 focus:bg-transparent hover:bg-black/5 rounded-none">
              {activeApp}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About {activeApp}</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Settings...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Services</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Hide {activeApp}</MenubarItem>
              <MenubarItem>Hide Others</MenubarItem>
              <MenubarItem>Show All</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Quit {activeApp}</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {menus.map((menu) => (
            <MenubarMenu key={menu}>
              <MenubarTrigger className="h-7 px-3 py-0 data-[state=open]:bg-black/10 focus:bg-transparent hover:bg-black/5 rounded-none transition-colors">
                {menu}
              </MenubarTrigger>
              <MenubarContent>
                {MENU_CONTENT[menu] ? (
                  MENU_CONTENT[menu].map((item) => (
                    <MenubarItem key={item}>{item}</MenubarItem>
                  ))
                ) : (
                  <>
                    <MenubarItem disabled>Option 1</MenubarItem>
                    <MenubarItem disabled>Option 2</MenubarItem>
                  </>
                )}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>

      <div className="flex items-center gap-3 px-2 text-foreground">
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

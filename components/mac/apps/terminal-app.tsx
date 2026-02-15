"use client"

import { useState, useRef, useEffect } from "react"

interface Line {
  type: "input" | "output"
  content: string
}

const ASCII_ART = `
  _____
 |_   _| __ ___  __ _ ___ _   _ _ __ ___
   | || '__/ _ \\/ _\` / __| | | | '__/ _ \\
   | || | |  __/ (_| \\__ \\ |_| | | |  __/
   |_||_|  \\___|\\__,_|___/\\__,_|_|  \\___|
  Treasure Ngonyama - Motion & Web
`

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help      - Show this help message
  about     - About me
  skills    - List my skills
  projects  - List my projects
  contact   - Contact information
  clear     - Clear terminal
  whoami    - Who am I?
  neofetch  - System info`,

  about: `Hello! My Name is Treasure.
I’m a designer with a love for cinema, synth music and storytelling.
I work for brands, social and TV specialising in designing for motion and web.`,

  skills: `Design:    Motion Graphics, UI/UX, Typography, 3D
Frontend:  Next.js, React, TypeScript, Tailwind CSS
Tools:     After Effects, Cinema 4D, Figma, Premiere Pro`,

  projects: `1. Showreel 2024 - Selected motion works
2. Brand Motion  - Identity systems for TV
3. Web Design    - Interactive experiences
4. Social Media  - Content for global brands`,

  contact: `Email:     treasurengonyama@gmail.com
Instagram: @treasures.lab`,

  whoami: "treasure - Motion Designer & Creative Developer",

  neofetch: `treasure@portfolio
------------------
OS:       macOS Sequoia 15.3
Host:     Portfolio v2.0
Kernel:   Next.js 16
Shell:    TypeScript 5.7
DE:       React 19
WM:       Tailwind CSS 3
Terminal: portfolio-term
CPU:      Caffeine-Powered Brain
Memory:   Infinite Curiosity`,
}

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: ASCII_ART },
    { type: "output", content: 'Welcome! Type "help" for available commands.\n' },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newLines: Line[] = [
      ...lines,
      { type: "input", content: `~ treasure $ ${input}` },
    ]

    if (cmd === "clear") {
      setLines([])
    } else if (COMMANDS[cmd]) {
      newLines.push({ type: "output", content: COMMANDS[cmd] })
      setLines(newLines)
    } else {
      newLines.push({
        type: "output",
        content: `zsh: command not found: ${cmd}. Type "help" for available commands.`,
      })
      setLines(newLines)
    }

    setHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(newIndex)
      if (history[newIndex]) setInput(history[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInput(newIndex === -1 ? "" : history[newIndex])
    }
  }

  return (
    <div
      className="flex h-full flex-col font-mono text-[13px]"
      style={{ background: "hsl(220, 14%, 8%)", color: "hsl(0, 0%, 85%)" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap"
            style={{
              color:
                line.type === "input" ? "hsl(142, 71%, 60%)" : "hsl(0, 0%, 85%)",
            }}
          >
            {line.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span style={{ color: "hsl(142, 71%, 60%)" }}>~ treasure $&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none caret-green-400"
            style={{ color: "hsl(0, 0%, 95%)" }}
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  )
}

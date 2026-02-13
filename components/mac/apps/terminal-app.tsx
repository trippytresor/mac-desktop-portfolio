"use client"

import { useState, useRef, useEffect } from "react"

interface Line {
  type: "input" | "output"
  content: string
}

const ASCII_ART = `
     ___  ____  
    |_ _|/ ___| 
     | | \\___ \\ 
     | |  ___) |
    |___|____/ 
  John Doe - Developer
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

  about: `Hi! I'm John Doe, a full-stack developer based in San Francisco.
I love building modern web applications with React, Next.js, and TypeScript.
I'm passionate about clean code, great UX, and open source.`,

  skills: `Frontend:  React, Next.js, TypeScript, Tailwind CSS
Backend:   Node.js, Python, Go
Database:  PostgreSQL, Redis, MongoDB
DevOps:    Docker, AWS, Vercel, GitHub Actions
Design:    Figma, Adobe Creative Suite`,

  projects: `1. CloudSync    - Real-time collaboration platform    [Next.js, WebSocket]
2. PixelForge   - AI-powered image editing tool      [React, TensorFlow.js]
3. DevMetrics   - Developer analytics dashboard      [TypeScript, D3.js]
4. NoteFlow     - AI-assisted markdown notes          [Next.js, AI SDK]
5. FormCraft    - Drag-and-drop form builder         [React, DnD Kit]
6. ShipFast     - SaaS boilerplate                   [Next.js, Stripe]`,

  contact: `Email:     hello@johndoe.dev
GitHub:    github.com/johndoe
LinkedIn:  linkedin.com/in/johndoe
Twitter:   twitter.com/johndoe`,

  whoami: "johndoe - Full-Stack Developer & Designer",

  neofetch: `johndoe@portfolio
-----------------
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
      { type: "input", content: `~ johndoe $ ${input}` },
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
          <span style={{ color: "hsl(142, 71%, 60%)" }}>~ johndoe $&nbsp;</span>
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

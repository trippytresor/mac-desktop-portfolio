"use client"

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react"

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  isActive: boolean
  zIndex: number
  onClose: () => void
  onFocus: () => void
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
  minSize?: { width: number; height: number }
}

export function Window({
  id,
  title,
  children,
  isActive,
  zIndex,
  onClose,
  onFocus,
  defaultPosition,
  defaultSize = { width: 700, height: 500 },
  minSize = { width: 400, height: 300 },
}: WindowProps) {
  const [position, setPosition] = useState(
    defaultPosition || { x: 100 + Math.random() * 100, y: 60 + Math.random() * 60 }
  )
  const [size, setSize] = useState(defaultSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [preMaxState, setPreMaxState] = useState({ position, size })

  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 })
  const resizeRef = useRef({ startX: 0, startY: 0, startW: 0, startH: 0 })

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return
      e.preventDefault()
      onFocus()
      setIsDragging(true)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }
    },
    [position, isMaximized, onFocus]
  )

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return
      e.preventDefault()
      e.stopPropagation()
      onFocus()
      setIsResizing(true)
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.width,
        startH: size.height,
      }
    },
    [size, isMaximized, onFocus]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: Math.max(28, dragRef.current.startPosY + dy),
      })
    }
    const handleUp = () => setIsDragging(false)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [isDragging])

  useEffect(() => {
    if (!isResizing) return

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeRef.current.startX
      const dy = e.clientY - resizeRef.current.startY
      setSize({
        width: Math.max(minSize.width, resizeRef.current.startW + dx),
        height: Math.max(minSize.height, resizeRef.current.startH + dy),
      })
    }
    const handleUp = () => setIsResizing(false)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [isResizing, minSize.width, minSize.height])

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaxState.position)
      setSize(preMaxState.size)
      setIsMaximized(false)
    } else {
      setPreMaxState({ position, size })
      setPosition({ x: 0, y: 28 })
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 28 - 70,
      })
      setIsMaximized(true)
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (isMinimized) return null

  return (
    <div
      data-window-id={id}
      className={`absolute flex flex-col overflow-hidden transition-shadow duration-200 ${
        isMaximized ? "rounded-none" : "rounded-xl"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        boxShadow: isActive
          ? "0 22px 70px 4px hsla(0,0%,0%,0.25), 0 0 0 1px hsla(220, 13%, 82%, 0.5)"
          : "0 8px 30px hsla(0,0%,0%,0.12), 0 0 0 1px hsla(220, 13%, 82%, 0.4)",
      }}
      onMouseDown={onFocus}
      role="dialog"
      aria-label={title}
    >
      {/* Title bar */}
      <div
        className="flex h-12 flex-shrink-0 items-center gap-2 px-4 select-none cursor-default"
        style={{
          background: isActive
            ? "hsla(0, 0%, 96%, 0.97)"
            : "hsla(0, 0%, 96%, 0.92)",
          borderBottom: "1px solid hsla(220, 13%, 82%, 0.6)",
        }}
        onMouseDown={handleDragStart}
        onDoubleClick={handleMaximize}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2 mr-2" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors"
            aria-label="Close window"
          >
            <svg className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100" viewBox="0 0 6 6" fill="none">
              <path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" stroke="#4a0002" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            onClick={handleMinimize}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] hover:bg-[#f5a623] transition-colors"
            aria-label="Minimize window"
          >
            <svg className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100" viewBox="0 0 6 6" fill="none">
              <path d="M0.5 3H5.5" stroke="#995700" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            onClick={handleMaximize}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] hover:bg-[#1aab29] transition-colors"
            aria-label="Maximize window"
          >
            <svg className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100" viewBox="0 0 6 6" fill="none">
              <path d="M0.5 1.5V0.5H5.5V5.5H4.5M0.5 1.5H4.5V5.5H0.5V1.5Z" stroke="#006500" strokeWidth="0.8" />
            </svg>
          </button>
        </div>
        <span
          className="flex-1 text-center text-[13px] font-medium"
          style={{
            color: isActive ? "hsl(220, 9%, 30%)" : "hsl(220, 9%, 50%)",
          }}
        >
          {title}
        </span>
        <div className="w-14" />
      </div>

      {/* Window content */}
      <div
        className="flex-1 overflow-auto"
        style={{ background: "hsl(0, 0%, 100%)" }}
      >
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          onMouseDown={handleResizeStart}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

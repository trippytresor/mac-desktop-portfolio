"use client"

import { useState } from "react"
import {
  ExternalLink,
  Github,
  Star,
  ChevronLeft,
  Grid3X3,
  List,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  stars: number
  link: string
  github: string
  color: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "CloudSync",
    description: "Real-time cloud collaboration platform",
    longDescription:
      "A full-stack collaboration platform built with Next.js and WebSockets. Features include real-time document editing, presence indicators, and a sophisticated conflict resolution system. Handles 10K+ concurrent users.",
    tags: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
    stars: 342,
    link: "#",
    github: "#",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    title: "PixelForge",
    description: "AI-powered image editing tool",
    longDescription:
      "An advanced image editor that leverages machine learning for intelligent photo manipulation. Includes features like one-click background removal, style transfer, and automated color correction using TensorFlow.js.",
    tags: ["React", "TensorFlow.js", "Canvas API", "Python"],
    stars: 567,
    link: "#",
    github: "#",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: "3",
    title: "DevMetrics",
    description: "Developer productivity analytics dashboard",
    longDescription:
      "A comprehensive analytics dashboard for development teams. Integrates with GitHub, Jira, and CI/CD pipelines to provide actionable insights on code quality, velocity, and team performance.",
    tags: ["TypeScript", "D3.js", "Node.js", "GraphQL"],
    stars: 218,
    link: "#",
    github: "#",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "4",
    title: "NoteFlow",
    description: "Markdown note-taking with AI assistance",
    longDescription:
      "A beautifully designed note-taking app with Markdown support and AI-powered writing assistance. Features include smart tagging, knowledge graphs, and seamless sync across devices.",
    tags: ["Next.js", "AI SDK", "Tailwind", "SQLite"],
    stars: 445,
    link: "#",
    github: "#",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "5",
    title: "FormCraft",
    description: "Drag-and-drop form builder",
    longDescription:
      "An intuitive form builder with drag-and-drop functionality, conditional logic, and advanced validation. Supports webhooks, email notifications, and integration with popular CRM platforms.",
    tags: ["React", "DnD Kit", "Zod", "Prisma"],
    stars: 189,
    link: "#",
    github: "#",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "6",
    title: "ShipFast",
    description: "SaaS boilerplate for rapid deployment",
    longDescription:
      "A production-ready SaaS starter kit with authentication, billing, team management, and email notifications. Reduces time-to-market from weeks to days.",
    tags: ["Next.js", "Stripe", "Supabase", "Resend"],
    stars: 892,
    link: "#",
    github: "#",
    color: "from-rose-500 to-red-500",
  },
]

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (selected) {
    return (
      <div className="flex h-full flex-col">
        {/* Toolbar */}
        <div
          className="flex items-center gap-3 px-4 py-2"
          style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
        >
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium hover:bg-black/5 transition-colors"
            style={{ color: "hsl(211, 100%, 50%)" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>
        </div>

        {/* Detail view */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            <div className={`mb-6 h-40 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center`}>
              <h1 className="text-3xl font-bold text-white">{selected.title}</h1>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm" style={{ color: "hsl(38, 92%, 50%)" }}>
                <Star className="h-4 w-4 fill-current" />
                {selected.stars}
              </div>
              <a
                href={selected.github}
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: "hsl(220, 9%, 30%)" }}
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
              <a
                href={selected.link}
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: "hsl(211, 100%, 50%)" }}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </div>

            <p className="mb-6 text-[14px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              {selected.longDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "hsl(220, 14%, 94%)",
                    color: "hsl(211, 100%, 40%)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
      >
        <span className="text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
          {projects.length} projects
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-md p-1 transition-colors ${viewMode === "grid" ? "bg-black/10" : "hover:bg-black/5"}`}
            style={{ color: "hsl(220, 9%, 30%)" }}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-md p-1 transition-colors ${viewMode === "list" ? "bg-black/10" : "hover:bg-black/5"}`}
            style={{ color: "hsl(220, 9%, 30%)" }}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="group flex flex-col rounded-xl text-left transition-all hover:shadow-md"
                style={{ border: "1px solid hsl(220, 13%, 90%)" }}
              >
                <div
                  className={`h-28 rounded-t-xl bg-gradient-to-br ${project.color} flex items-end p-4`}
                >
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-3 text-xs" style={{ color: "hsl(220, 9%, 40%)" }}>
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-xs" style={{ color: "hsl(38, 92%, 50%)" }}>
                      <Star className="h-3 w-3 fill-current" />
                      {project.stars}
                    </div>
                    <div className="flex gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded px-1.5 py-0.5 text-[10px]"
                          style={{
                            background: "hsl(220, 14%, 94%)",
                            color: "hsl(220, 9%, 46%)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="flex items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-black/5"
                style={{ border: "1px solid hsl(220, 13%, 92%)" }}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${project.color}`}
                >
                  <span className="text-sm font-bold text-white">{project.title[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 9%, 12%)" }}>
                    {project.title}
                  </h3>
                  <p className="truncate text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(38, 92%, 50%)" }}>
                  <Star className="h-3 w-3 fill-current" />
                  {project.stars}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

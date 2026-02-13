"use client"

import { useState } from "react"
import { Play, Pause, ChevronLeft, ExternalLink, Clock, Layers } from "lucide-react"

interface MotionProject {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  duration: string
  tools: string[]
  color: string
  frames: string[]
}

const motionProjects: MotionProject[] = [
  {
    id: "1",
    title: "Fluid Interfaces",
    description: "Micro-interactions & UI transitions for a fintech app",
    longDescription:
      "A comprehensive motion design system for a fintech application, featuring fluid page transitions, spring-based gesture animations, and delightful micro-interactions. Every element responds naturally to user input with physics-based easing curves.",
    tags: ["UI Animation", "Micro-interactions", "Prototyping"],
    duration: "0:42",
    tools: ["After Effects", "Principle", "Lottie"],
    color: "from-violet-500 to-fuchsia-500",
    frames: ["hsl(270, 60%, 92%)", "hsl(290, 60%, 90%)", "hsl(310, 60%, 92%)"],
  },
  {
    id: "2",
    title: "Brand Reveal",
    description: "Logo animation & brand identity motion",
    longDescription:
      "A striking brand reveal sequence combining 3D elements with 2D typography. The logo deconstructs and reassembles through particle effects, establishing a bold visual identity that carries across all digital touchpoints.",
    tags: ["Logo Animation", "Brand Identity", "3D"],
    duration: "0:15",
    tools: ["Cinema 4D", "After Effects", "Redshift"],
    color: "from-amber-500 to-orange-600",
    frames: ["hsl(38, 80%, 92%)", "hsl(25, 80%, 90%)", "hsl(15, 80%, 92%)"],
  },
  {
    id: "3",
    title: "Data Viz Motion",
    description: "Animated data visualization for annual report",
    longDescription:
      "Transforming complex financial data into an engaging animated narrative. Charts, graphs, and infographics come alive with carefully choreographed sequences that guide the viewer through key insights with clarity and visual impact.",
    tags: ["Data Viz", "Infographics", "Storytelling"],
    duration: "1:20",
    tools: ["After Effects", "Illustrator", "D3.js"],
    color: "from-emerald-500 to-teal-600",
    frames: ["hsl(160, 60%, 92%)", "hsl(170, 60%, 90%)", "hsl(180, 60%, 92%)"],
  },
  {
    id: "4",
    title: "Onboarding Flow",
    description: "Animated onboarding sequence for a health app",
    longDescription:
      "A warm, inviting onboarding experience using character animation and illustrated scenes. Each step transitions seamlessly into the next with morphing shapes and staggered text reveals, reducing drop-off by 35%.",
    tags: ["Onboarding", "Character Animation", "UX"],
    duration: "0:58",
    tools: ["After Effects", "Figma", "Bodymovin"],
    color: "from-sky-500 to-blue-600",
    frames: ["hsl(200, 70%, 92%)", "hsl(210, 70%, 90%)", "hsl(220, 70%, 92%)"],
  },
  {
    id: "5",
    title: "Product Launch",
    description: "3D product showcase with kinetic typography",
    longDescription:
      "A high-energy product launch video combining 3D product renders with kinetic typography and dynamic camera movements. Bold colors and snappy timing create a sense of excitement and premium quality.",
    tags: ["3D", "Kinetic Type", "Product"],
    duration: "0:30",
    tools: ["Blender", "After Effects", "Premiere"],
    color: "from-rose-500 to-red-600",
    frames: ["hsl(350, 70%, 92%)", "hsl(0, 70%, 90%)", "hsl(10, 70%, 92%)"],
  },
  {
    id: "6",
    title: "Social Toolkit",
    description: "Animated template system for social media",
    longDescription:
      "A modular motion design toolkit for social media content. Includes animated lower thirds, story templates, carousel transitions, and reusable text reveal presets -- all built with a consistent visual language and easy customization.",
    tags: ["Social Media", "Templates", "Motion System"],
    duration: "Various",
    tools: ["After Effects", "Figma", "Lottie"],
    color: "from-pink-500 to-rose-500",
    frames: ["hsl(330, 70%, 92%)", "hsl(340, 70%, 90%)", "hsl(350, 70%, 92%)"],
  },
]

function AnimatedPreview({ project, isPlaying }: { project: MotionProject; isPlaying: boolean }) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
      {/* Animated shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`absolute h-24 w-24 rounded-full opacity-30 ${isPlaying ? "animate-ping" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.3)", animationDuration: "2s" }}
        />
        <div
          className={`absolute h-16 w-16 rounded-xl opacity-40 ${isPlaying ? "animate-spin" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.25)", animationDuration: "3s" }}
        />
        <div
          className={`absolute h-10 w-10 rounded-full opacity-50 ${isPlaying ? "animate-bounce" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.35)" }}
        />
      </div>
      {/* Title overlay */}
      <h2 className="relative z-10 text-2xl font-bold text-white" style={{ textShadow: "0 2px 8px hsla(0,0%,0%,0.3)" }}>
        {project.title}
      </h2>
    </div>
  )
}

export function MotionApp() {
  const [selected, setSelected] = useState<MotionProject | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  if (selected) {
    const isPlaying = playingId === selected.id
    return (
      <div className="flex h-full flex-col">
        {/* Toolbar */}
        <div
          className="flex items-center gap-3 px-4 py-2"
          style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
        >
          <button
            onClick={() => { setSelected(null); setPlayingId(null) }}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium hover:bg-black/5 transition-colors"
            style={{ color: "hsl(211, 100%, 50%)" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <div className="flex-1" />
          <span className="flex items-center gap-1 text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
            <Clock className="h-3 w-3" />
            {selected.duration}
          </span>
        </div>

        {/* Detail view */}
        <div className="flex-1 overflow-auto">
          {/* Video preview */}
          <div className="relative h-56">
            <AnimatedPreview project={selected} isPlaying={isPlaying} />
            <button
              onClick={() => setPlayingId(isPlaying ? null : selected.id)}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "hsla(0, 0%, 100%, 0.9)", backdropFilter: "blur(8px)" }}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" style={{ color: "hsl(220, 9%, 20%)" }} />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" style={{ color: "hsl(220, 9%, 20%)" }} />
                )}
              </div>
            </button>
          </div>

          {/* Details */}
          <div className="p-6">
            <h1 className="mb-1 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
              {selected.title}
            </h1>
            <p className="mb-4 text-sm" style={{ color: "hsl(220, 9%, 46%)" }}>
              {selected.description}
            </p>

            <p className="mb-5 text-[14px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              {selected.longDescription}
            </p>

            <div className="mb-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{ background: "hsl(220, 14%, 94%)", color: "hsl(280, 60%, 45%)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
                Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{ background: "hsl(220, 14%, 94%)", color: "hsl(220, 9%, 36%)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
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
        <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
          <Layers className="h-3.5 w-3.5" />
          {motionProjects.length} motion projects
        </span>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {motionProjects.map((project) => {
            const isPlaying = playingId === project.id
            return (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="group flex flex-col rounded-xl text-left transition-all hover:shadow-md overflow-hidden"
                style={{ border: "1px solid hsl(220, 13%, 90%)" }}
              >
                {/* Thumbnail with play */}
                <div className="relative h-32">
                  <AnimatedPreview project={project} isPlaying={isPlaying} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "hsla(0, 0%, 100%, 0.85)" }}
                    >
                      <Play className="h-4 w-4 ml-0.5" style={{ color: "hsl(220, 9%, 20%)" }} />
                    </div>
                  </div>
                  <span
                    className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
                    style={{ background: "hsla(0, 0%, 0%, 0.6)", backdropFilter: "blur(4px)" }}
                  >
                    {project.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="mb-0.5 text-sm font-semibold" style={{ color: "hsl(220, 9%, 12%)" }}>
                    {project.title}
                  </h3>
                  <p className="text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
                    {project.description}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-1.5 py-0.5 text-[10px]"
                        style={{ background: "hsl(220, 14%, 94%)", color: "hsl(220, 9%, 46%)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

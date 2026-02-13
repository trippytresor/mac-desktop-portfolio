"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink,
  Zap,
  Eye,
  Target,
  Sparkles,
} from "lucide-react"

/* ─── Case Study Data ──────────────────────────────────────────── */

interface CaseStudy {
  id: string
  title: string
  client: string
  year: string
  role: string
  duration: string
  overview: string
  challenge: string
  approach: string
  result: string
  gradient: string
  accentHsl: string
  tools: string[]
  tags: string[]
  stats: { label: string; value: string }[]
  phases: { title: string; description: string }[]
  deliverables: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "fluid-interfaces",
    title: "Fluid Interfaces",
    client: "FinVault",
    year: "2025",
    role: "Lead Motion Designer",
    duration: "8 weeks",
    overview:
      "A comprehensive motion system for a next-gen fintech platform. Every interaction was designed to feel tactile and responsive -- from page transitions that morph between states to spring-based gestures that give users a sense of direct manipulation.",
    challenge:
      "FinVault's existing app felt static and mechanical. Users reported the interface felt 'disconnected' from their actions. The challenge was to create a motion language that made complex financial data feel approachable without sacrificing performance on lower-end devices.",
    approach:
      "I built a modular animation library using spring physics rather than bezier curves, allowing elements to respond naturally to velocity and direction. Every animation was designed to convey meaning -- loading states communicate progress, transitions show spatial relationships, and micro-interactions confirm actions.",
    result:
      "User engagement increased 42% and the 'app feels premium' sentiment in surveys jumped from 23% to 87%. The motion system was adopted across all FinVault products.",
    gradient: "from-violet-500 to-fuchsia-500",
    accentHsl: "hsl(270, 60%, 55%)",
    tools: ["After Effects", "Principle", "Lottie", "Rive"],
    tags: ["UI Animation", "Micro-interactions", "Design System"],
    stats: [
      { label: "Engagement", value: "+42%" },
      { label: "Premium Feel", value: "87%" },
      { label: "Components", value: "120+" },
      { label: "Load Time", value: "<16ms" },
    ],
    phases: [
      { title: "Audit", description: "Mapped every interaction point across 48 screens to identify animation opportunities and pain points." },
      { title: "Principles", description: "Defined 5 core motion principles: responsive, meaningful, consistent, performant, and delightful." },
      { title: "Prototype", description: "Built high-fidelity prototypes in Principle to test spring physics and gesture-based transitions." },
      { title: "Implement", description: "Worked with engineering to implement Lottie + Rive animations with a shared token system." },
    ],
    deliverables: ["Animation library (120+ components)", "Motion guidelines document", "Lottie export pipeline", "Developer handoff specs"],
  },
  {
    id: "brand-reveal",
    title: "Brand Reveal",
    client: "Helios Labs",
    year: "2025",
    role: "Motion Director",
    duration: "4 weeks",
    overview:
      "A cinematic brand reveal combining 3D particle systems with typographic choreography. The logo deconstructs into light particles and reforms through volumetric space, establishing Helios Labs' identity as a forward-looking biotech company.",
    challenge:
      "Helios Labs was rebranding from a traditional pharmaceutical company to a cutting-edge biotech firm. The reveal needed to bridge the gap between scientific precision and creative innovation, while being adaptable across digital, social, and broadcast formats.",
    approach:
      "I developed the concept around 'emergence' -- the idea that complex beauty arises from simple elements. The logo is built from 10,000+ particles that follow flocking algorithms, creating organic movement that still resolves into precise geometric forms.",
    result:
      "The reveal generated 2.8M views across platforms in the first week. It was featured in Motion Design School's annual showcase and became the benchmark for all subsequent Helios brand content.",
    gradient: "from-amber-500 to-orange-600",
    accentHsl: "hsl(30, 90%, 52%)",
    tools: ["Cinema 4D", "Redshift", "After Effects", "X-Particles"],
    tags: ["Logo Animation", "3D", "Brand Identity", "Broadcast"],
    stats: [
      { label: "Views (Week 1)", value: "2.8M" },
      { label: "Formats", value: "12" },
      { label: "Particles", value: "10K+" },
      { label: "Render Time", value: "72hrs" },
    ],
    phases: [
      { title: "Concept", description: "Explored 'emergence' as the central theme -- complexity arising from simplicity." },
      { title: "R&D", description: "Developed particle flocking systems in Cinema 4D with X-Particles to achieve organic movement." },
      { title: "Animation", description: "Choreographed the 15-second sequence across 3 acts: dissolution, journey, and formation." },
      { title: "Delivery", description: "Rendered and adapted for 12 formats: 4K broadcast, social (1:1, 9:16, 16:9), and web." },
    ],
    deliverables: ["15s hero animation", "5s social loops (3 variants)", "Brand motion guidelines", "Template project files"],
  },
  {
    id: "data-viz",
    title: "Data Viz Motion",
    client: "Meridian Capital",
    year: "2024",
    role: "Creative Lead",
    duration: "12 weeks",
    overview:
      "Transforming Meridian Capital's annual report into an interactive animated narrative. Complex financial data becomes engaging through choreographed visualizations that guide viewers through a year of market movements, portfolio performance, and strategic insights.",
    challenge:
      "Annual reports are notoriously dry. Meridian needed their data to not only inform but engage board members, investors, and the public. The 80-second piece had to maintain scientific accuracy while being visually compelling enough for social media distribution.",
    approach:
      "I treated each data point as a character in a story. Charts don't just appear -- they build from raw data particles that settle into meaningful formations. Color encodes sentiment, movement encodes velocity of change, and scale encodes magnitude. A consistent visual grammar ties 14 distinct data sets into one narrative.",
    result:
      "The animated report had 5x longer average view time than the static PDF version. Investor engagement with the annual report increased 310%, and the approach was adopted for quarterly reporting.",
    gradient: "from-emerald-500 to-teal-600",
    accentHsl: "hsl(160, 60%, 45%)",
    tools: ["After Effects", "D3.js", "Illustrator", "Figma"],
    tags: ["Data Visualization", "Infographics", "Storytelling", "Interactive"],
    stats: [
      { label: "View Time", value: "5x" },
      { label: "Engagement", value: "+310%" },
      { label: "Data Sets", value: "14" },
      { label: "Duration", value: "80s" },
    ],
    phases: [
      { title: "Data Audit", description: "Analyzed 14 datasets to identify narrative arcs and the most impactful story beats." },
      { title: "Storyboard", description: "Created a frame-by-frame storyboard mapping data transformations to emotional beats." },
      { title: "Design", description: "Developed a visual grammar for encoding data dimensions through color, motion, and scale." },
      { title: "Animate", description: "Produced 80 seconds of choreographed data animation with procedural and hand-keyed techniques." },
    ],
    deliverables: ["80s animated report", "Interactive web version (D3.js)", "Social media cuts (6 clips)", "Style guide"],
  },
  {
    id: "onboarding",
    title: "Onboarding Flow",
    client: "Wellspring Health",
    year: "2024",
    role: "Motion Designer",
    duration: "6 weeks",
    overview:
      "A warm, human-centered onboarding experience for a health and wellness app. Character animation and illustrated scenes guide new users through account setup, goal selection, and their first tracked activity -- reducing drop-off by 35%.",
    challenge:
      "Wellspring's previous onboarding was a 7-step form that lost 60% of users before completion. The challenge was to make the setup process feel like a conversation rather than an interrogation, while still collecting the data needed for personalization.",
    approach:
      "I designed animated transitions where each screen morphs into the next -- a selected goal icon expands into the next screen's illustration, form fields float in as the character guide gestures toward them. The result feels like turning pages in a storybook rather than filling out forms.",
    result:
      "Onboarding completion jumped from 40% to 75%. Time-to-first-action decreased by 28%, and the animated approach was extended to the app's entire tutorial system.",
    gradient: "from-sky-500 to-blue-600",
    accentHsl: "hsl(205, 80%, 52%)",
    tools: ["After Effects", "Figma", "Bodymovin", "Lottie"],
    tags: ["Onboarding", "Character Animation", "UX", "Mobile"],
    stats: [
      { label: "Completion", value: "75%" },
      { label: "Drop-off", value: "-35%" },
      { label: "Time to Action", value: "-28%" },
      { label: "Screens", value: "7" },
    ],
    phases: [
      { title: "UX Research", description: "Analyzed drop-off data and conducted user interviews to identify friction points." },
      { title: "Character Design", description: "Created an animated guide character with 12 unique poses and expressions." },
      { title: "Flow Design", description: "Designed morphing transitions between screens so each step flows into the next." },
      { title: "Export", description: "Optimized Lottie exports to stay under 50kb per animation for mobile performance." },
    ],
    deliverables: ["7 onboarding animations", "Character animation library", "Lottie exports", "Motion specs for dev"],
  },
  {
    id: "product-launch",
    title: "Product Launch",
    client: "Aether Audio",
    year: "2025",
    role: "Motion Director",
    duration: "5 weeks",
    overview:
      "A high-energy product launch film for Aether Audio's flagship wireless headphones. Combining photorealistic 3D product renders with kinetic typography and dynamic camera work, the 30-second spot positions the product as a premium piece of wearable technology.",
    challenge:
      "Aether Audio was entering a saturated market dominated by established brands. The launch film needed to immediately communicate premium quality, technical innovation, and desirability -- all within 30 seconds and without relying on celebrity endorsement.",
    approach:
      "I focused on the product itself as the hero. Macro-level 3D renders reveal material textures and engineering details, while kinetic type overlays communicate specs with the rhythm and energy of a music video. The camera never stops moving, creating a sense of momentum and excitement.",
    result:
      "The launch film contributed to a sell-out of the initial 50K-unit run within 48 hours. It was awarded Bronze at the ADC Awards for Motion Design and became a case study in product-focused storytelling.",
    gradient: "from-rose-500 to-red-600",
    accentHsl: "hsl(350, 75%, 52%)",
    tools: ["Blender", "After Effects", "Premiere Pro", "Octane"],
    tags: ["3D", "Kinetic Typography", "Product Film", "Broadcast"],
    stats: [
      { label: "Units Sold", value: "50K" },
      { label: "Sell-out", value: "48hrs" },
      { label: "ADC Award", value: "Bronze" },
      { label: "Duration", value: "30s" },
    ],
    phases: [
      { title: "Styleframes", description: "Developed 8 key styleframes establishing the visual tone: dark, premium, kinetic." },
      { title: "3D Modeling", description: "Built photorealistic product model in Blender with accurate materials and lighting." },
      { title: "Animation", description: "Choreographed camera moves, product reveals, and kinetic type to a custom soundtrack." },
      { title: "Post", description: "Color graded, composited lens effects, and delivered across broadcast and digital formats." },
    ],
    deliverables: ["30s hero film", "15s cut-down", "6s bumpers (3 variants)", "Behind-the-scenes breakdown"],
  },
]

/* ─── Animated Preview ──────────────────────────────────────────── */

function AnimatedPreview({
  gradient,
  title,
  isPlaying,
}: {
  gradient: string
  title: string
  isPlaying: boolean
}) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`absolute h-32 w-32 rounded-full ${isPlaying ? "animate-ping" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.08)", animationDuration: "3s" }}
        />
        <div
          className={`absolute h-20 w-20 rounded-xl ${isPlaying ? "animate-spin" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.06)", animationDuration: "4s" }}
        />
        <div
          className={`absolute h-12 w-12 rounded-full ${isPlaying ? "animate-bounce" : ""}`}
          style={{ background: "hsla(0, 0%, 100%, 0.1)" }}
        />
      </div>
      <h2
        className="relative z-10 text-3xl font-bold text-white text-center px-4"
        style={{ textShadow: "0 2px 12px hsla(0,0%,0%,0.4)" }}
      >
        {title}
      </h2>
    </div>
  )
}

/* ─── Case Study Detail ─────────────────────────────────────────── */

function CaseStudyDetail({
  study,
  onBack,
}: {
  study: CaseStudy
  onBack: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
        style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium hover:bg-black/5 transition-colors"
          style={{ color: "hsl(211, 100%, 50%)" }}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          All Projects
        </button>
        <div className="flex-1" />
        <span className="text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
          {study.client} &middot; {study.year}
        </span>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-auto">

        {/* ── LAYOUT 1: Full-bleed Hero ─────────────────── */}
        <div className="relative h-64">
          <AnimatedPreview gradient={study.gradient} title={study.title} isPlaying={isPlaying} />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "hsla(0, 0%, 100%, 0.85)", backdropFilter: "blur(8px)" }}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" style={{ color: "hsl(220, 9%, 20%)" }} />
              ) : (
                <Play className="h-5 w-5 ml-0.5" style={{ color: "hsl(220, 9%, 20%)" }} />
              )}
            </div>
          </button>
          {/* Metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(to top, hsla(0,0%,0%,0.6), transparent)" }}>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white"
                  style={{ background: "hsla(0, 0%, 100%, 0.2)", backdropFilter: "blur(4px)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── LAYOUT 2: Stats Bar ───────────────────────── */}
        <div
          className="grid grid-cols-4 divide-x"
          style={{ background: "hsl(220, 14%, 97%)", borderBottom: "1px solid hsl(220, 13%, 90%)", divideColor: "hsl(220, 13%, 90%)" }}
        >
          {study.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-4 gap-0.5">
              <span className="text-lg font-bold" style={{ color: study.accentHsl }}>{stat.value}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── LAYOUT 3: Two-column Overview + Meta ──────── */}
        <div className="flex gap-6 p-6" style={{ borderBottom: "1px solid hsl(220, 13%, 92%)" }}>
          <div className="flex-1">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Overview</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              {study.overview}
            </p>
          </div>
          <div className="w-40 flex-shrink-0 flex flex-col gap-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Role</span>
              <p className="text-xs font-medium mt-0.5" style={{ color: "hsl(220, 9%, 20%)" }}>{study.role}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Duration</span>
              <p className="text-xs font-medium mt-0.5" style={{ color: "hsl(220, 9%, 20%)" }}>{study.duration}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Tools</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {study.tools.map((tool) => (
                  <span key={tool} className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "hsl(220, 14%, 94%)", color: "hsl(220, 9%, 36%)" }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── LAYOUT 4: Challenge / Approach Split ──────── */}
        <div className="grid grid-cols-2" style={{ borderBottom: "1px solid hsl(220, 13%, 92%)" }}>
          <div className="p-6" style={{ borderRight: "1px solid hsl(220, 13%, 92%)" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: "hsl(0, 72%, 95%)" }}>
                <Target className="h-3.5 w-3.5" style={{ color: "hsl(0, 72%, 51%)" }} />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Challenge</h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              {study.challenge}
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: "hsl(142, 71%, 93%)" }}>
                <Zap className="h-3.5 w-3.5" style={{ color: "hsl(142, 71%, 35%)" }} />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Approach</h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              {study.approach}
            </p>
          </div>
        </div>

        {/* ── LAYOUT 5: Process Timeline (Horizontal) ───── */}
        <div className="p-6" style={{ borderBottom: "1px solid hsl(220, 13%, 92%)" }}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Process</h3>
          <div className="flex gap-3">
            {study.phases.map((phase, i) => (
              <div key={phase.title} className="flex-1 relative">
                {/* Connector line */}
                {i < study.phases.length - 1 && (
                  <div className="absolute top-3 left-[calc(50%+12px)] right-0 h-px" style={{ background: "hsl(220, 13%, 88%)" }} />
                )}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white mb-2 relative z-10"
                    style={{ background: study.accentHsl }}
                  >
                    {i + 1}
                  </div>
                  <h4 className="text-xs font-semibold mb-1" style={{ color: "hsl(220, 9%, 18%)" }}>{phase.title}</h4>
                  <p className="text-[11px] leading-snug" style={{ color: "hsl(220, 9%, 46%)" }}>{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYOUT 6: Result + Deliverables Bento ─────── */}
        <div className="grid grid-cols-5 gap-4 p-6">
          {/* Result card -- spans 3 cols */}
          <div className="col-span-3 rounded-xl p-5" style={{ background: `linear-gradient(135deg, ${study.accentHsl}, hsl(220, 14%, 20%))` }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-white/80" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">Result</h3>
            </div>
            <p className="text-[13px] leading-relaxed text-white/90">
              {study.result}
            </p>
          </div>
          {/* Deliverables card -- spans 2 cols */}
          <div className="col-span-2 rounded-xl p-5" style={{ background: "hsl(220, 14%, 97%)", border: "1px solid hsl(220, 13%, 90%)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4" style={{ color: "hsl(220, 9%, 46%)" }} />
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 50%)" }}>Deliverables</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {study.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-[12px]" style={{ color: "hsl(220, 9%, 25%)" }}>
                  <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: study.accentHsl }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Gallery Card ──────────────────────────────────────────────── */

function GalleryCard({
  study,
  layout,
  onClick,
}: {
  study: CaseStudy
  layout: "tall" | "wide" | "square"
  onClick: () => void
}) {
  const heightClass = layout === "tall" ? "row-span-2" : layout === "wide" ? "col-span-2" : ""

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl text-left transition-all hover:shadow-lg ${heightClass}`}
      style={{ border: "1px solid hsl(220, 13%, 90%)" }}
    >
      <div className={`relative ${layout === "tall" ? "h-full min-h-[280px]" : layout === "wide" ? "h-44" : "h-40"}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} transition-transform duration-500 group-hover:scale-105`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full animate-pulse" style={{ background: "hsla(0, 0%, 100%, 0.06)", animationDuration: "3s" }} />
            <div className="absolute h-14 w-14 rounded-lg animate-spin" style={{ background: "hsla(0, 0%, 100%, 0.04)", animationDuration: "6s" }} />
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
            style={{ background: "hsla(0, 0%, 100%, 0.9)" }}
          >
            <Eye className="h-4 w-4" style={{ color: "hsl(220, 9%, 20%)" }} />
          </div>
        </div>
        {/* Info overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ background: "linear-gradient(to top, hsla(0,0%,0%,0.7), transparent)" }}
        >
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{study.title}</h3>
              <p className="text-[11px] text-white/70 mt-0.5">{study.client} &middot; {study.year}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ background: "hsla(0,0%,100%,0.2)" }}>
              <Clock className="h-2.5 w-2.5" />
              {study.duration}
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            {study.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white/80" style={{ background: "hsla(0,0%,100%,0.15)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}

/* ─── Main Motion App ───────────────────────────────────────────── */

const galleryLayouts: ("tall" | "wide" | "square")[] = ["tall", "wide", "square", "square", "tall"]

export function MotionApp() {
  const [selected, setSelected] = useState<CaseStudy | null>(null)

  if (selected) {
    return <CaseStudyDetail study={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
      >
        <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
          <Layers className="h-3.5 w-3.5" />
          {caseStudies.length} Case Studies
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "hsl(220, 9%, 56%)" }}>
          Motion Design Portfolio
        </span>
      </div>

      {/* Bento gallery grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-3 auto-rows-[140px] gap-3">
          {caseStudies.map((study, i) => (
            <GalleryCard
              key={study.id}
              study={study}
              layout={galleryLayouts[i % galleryLayouts.length]}
              onClick={() => setSelected(study)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

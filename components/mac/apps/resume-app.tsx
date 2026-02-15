"use client"

import { Download, FileText, Printer, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

export function ResumeApp() {
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" style={{ color: "hsl(0, 72%, 51%)" }} />
          <span className="text-xs font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
            Resume_TreasureNgonyama.pdf
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="rounded p-1 hover:bg-black/5"
            style={{ color: "hsl(220, 9%, 40%)" }}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs tabular-nums w-10 text-center" style={{ color: "hsl(220, 9%, 46%)" }}>
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="rounded p-1 hover:bg-black/5"
            style={{ color: "hsl(220, 9%, 40%)" }}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <div className="mx-2 h-4 w-px" style={{ background: "hsl(220, 13%, 85%)" }} />
          <button
            className="rounded p-1 hover:bg-black/5"
            style={{ color: "hsl(220, 9%, 40%)" }}
            aria-label="Print"
          >
            <Printer className="h-3.5 w-3.5" />
          </button>
          <button
            className="rounded p-1 hover:bg-black/5"
            style={{ color: "hsl(220, 9%, 40%)" }}
            aria-label="Download"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* PDF Preview area */}
      <div
        className="flex-1 overflow-auto flex justify-center py-6"
        style={{ background: "hsl(220, 9%, 75%)" }}
      >
        <div
          className="rounded-sm shadow-xl"
          style={{
            width: `${(612 * zoom) / 100}px`,
            minHeight: `${(792 * zoom) / 100}px`,
            background: "white",
            transform: `scale(1)`,
            transformOrigin: "top center",
          }}
        >
          <div className="p-10" style={{ fontSize: `${(zoom / 100) * 1}em` }}>
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                TREASURE NGONYAMA
              </h1>
              <p className="mt-1 text-sm" style={{ color: "hsl(220, 9%, 46%)" }}>
                Motion Designer & Creative Developer
              </p>
              <p className="mt-1 text-xs" style={{ color: "hsl(220, 9%, 55%)" }}>
                Johannesburg, South Africa | treasurengonyama@gmail.com | @treasures.lab
              </p>
            </div>

            <div className="h-px w-full mb-5" style={{ background: "hsl(220, 13%, 85%)" }} />

            {/* Summary */}
            <section className="mb-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 12%)" }}>
                Summary
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(220, 9%, 30%)" }}>
                Creative Motion Designer and Frontend Developer with a passion for cinematic storytelling
                and interactive web experiences. Specializing in branding, social media content, and
                TV motion graphics. Expert in bringing designs to life through motion.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 12%)" }}>
                Experience
              </h2>
              {[
                {
                  title: "Lead Motion Designer",
                  company: "CreativeStudio, Johannesburg",
                  date: "Jan 2023 - Present",
                  bullets: [
                    "Directed motion identity for major global brands, increasing engagement by 50%",
                    "Developed automated motion templates for social media teams",
                    "Leading a team of 3 designers to deliver high-end TV commercials",
                  ],
                },
                {
                  title: "Senior Motion Graphics Artist",
                  company: "MediaHouse, Cape Town",
                  date: "Mar 2021 - Dec 2022",
                  bullets: [
                    "Created award-winning motion graphics for broadcast television",
                    "Integrated 3D elements into 2D workflows using Cinema 4D",
                    "Optimized render times by 30% through advanced workflow techniques",
                  ],
                },
                {
                  title: "Junior Designer",
                  company: "DesignLab, Durban",
                  date: "Jun 2019 - Feb 2021",
                  bullets: [
                    "Assisted in the creation of branding systems and social content",
                    "Ensured pixel-perfect delivery across all digital platforms",
                  ],
                },
              ].map((job) => (
                <div key={job.title} className="mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                        {job.title}
                      </h3>
                      <p className="text-xs italic" style={{ color: "hsl(220, 9%, 46%)" }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-[10px]" style={{ color: "hsl(220, 9%, 46%)" }}>
                      {job.date}
                    </span>
                  </div>
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-1.5 text-[11px]" style={{ color: "hsl(220, 9%, 30%)" }}>
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "hsl(220, 9%, 46%)" }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="mb-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 12%)" }}>
                Education
              </h2>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                    B.A. Graphic Design
                  </h3>
                  <p className="text-xs italic" style={{ color: "hsl(220, 9%, 46%)" }}>
                    University of Johannesburg
                  </p>
                </div>
                <span className="text-[10px]" style={{ color: "hsl(220, 9%, 46%)" }}>
                  2015 - 2019
                </span>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 12%)" }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "After Effects", "Cinema 4D", "Figma", "Premiere Pro",
                  "React", "Next.js", "TypeScript", "Tailwind CSS",
                  "Motion Graphics", "UI/UX", "3D Animation", "Branding",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: "hsl(220, 14%, 94%)",
                      color: "hsl(220, 9%, 30%)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { MapPin, Briefcase, GraduationCap, Code2, Palette } from "lucide-react"

export function AboutApp() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className="flex w-56 flex-shrink-0 flex-col gap-1 p-3"
        style={{ background: "hsl(220, 14%, 96%)", borderRight: "1px solid hsl(220, 13%, 88%)" }}
      >
        <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
          Navigation
        </div>
        {[
          { icon: <Code2 className="h-4 w-4" />, label: "Overview", active: true },
          { icon: <Briefcase className="h-4 w-4" />, label: "Experience" },
          { icon: <GraduationCap className="h-4 w-4" />, label: "Education" },
          { icon: <Palette className="h-4 w-4" />, label: "Skills" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] cursor-default ${
              item.active
                ? "font-medium"
                : ""
            }`}
            style={
              item.active
                ? { background: "hsl(211, 100%, 50%)", color: "white" }
                : { color: "hsl(220, 9%, 30%)" }
            }
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-xl">
          {/* Avatar and name */}
          <div className="mb-8 flex items-center gap-5">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, hsl(211, 100%, 50%), hsl(211, 100%, 35%))",
                color: "white",
              }}
            >
              JD
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                John Doe
              </h1>
              <p className="text-sm" style={{ color: "hsl(220, 9%, 46%)" }}>
                Full-Stack Developer & Designer
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
                <MapPin className="h-3 w-3" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Bio */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
              About
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: "hsl(220, 9%, 25%)" }}>
              I&apos;m a passionate developer who loves crafting beautiful, performant web experiences.
              With 5+ years of experience building modern applications, I specialize in React, Next.js,
              and TypeScript. I believe in clean code, thoughtful design, and building products that
              make a real impact.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
                "PostgreSQL", "GraphQL", "Docker", "AWS", "Figma",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "hsl(220, 14%, 94%)",
                    color: "hsl(211, 100%, 40%)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience highlight */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
              Experience
            </h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  role: "Senior Frontend Engineer",
                  company: "TechCorp",
                  period: "2023 - Present",
                  desc: "Leading frontend architecture and mentoring a team of 5 engineers.",
                },
                {
                  role: "Full-Stack Developer",
                  company: "StartupXYZ",
                  period: "2021 - 2023",
                  desc: "Built and scaled the core product from 0 to 50K users.",
                },
                {
                  role: "Frontend Developer",
                  company: "DesignStudio",
                  period: "2019 - 2021",
                  desc: "Created pixel-perfect interfaces for enterprise clients.",
                },
              ].map((job) => (
                <div
                  key={job.role}
                  className="rounded-lg p-4"
                  style={{ border: "1px solid hsl(220, 13%, 90%)" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 9%, 12%)" }}>
                        {job.role}
                      </h3>
                      <p className="text-xs font-medium" style={{ color: "hsl(211, 100%, 50%)" }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs" style={{ color: "hsl(220, 9%, 40%)" }}>
                    {job.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

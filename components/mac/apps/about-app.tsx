"use client"

import { useState } from "react"
import { MapPin, Briefcase, GraduationCap, Code2, Palette } from "lucide-react"

export function AboutApp() {
  const [activeTab, setActiveTab] = useState("Overview")

  const tabs = [
    { icon: <Code2 className="h-4 w-4" />, label: "Overview" },
    { icon: <Briefcase className="h-4 w-4" />, label: "Experience" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Education" },
    { icon: <Palette className="h-4 w-4" />, label: "Skills" },
  ]

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className="flex w-44 flex-shrink-0 flex-col gap-1 p-3 backdrop-blur-md"
        style={{
          background: "hsla(220, 14%, 96%, 0.7)",
          borderRight: "1px solid hsla(220, 13%, 80%, 0.4)"
        }}
      >
        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider opacity-50" style={{ color: "hsl(220, 9%, 20%)" }}>
          About
        </div>
        {tabs.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] w-full text-left transition-all ${
              activeTab === item.label
                ? "shadow-sm"
                : "hover:bg-black/5 active:bg-black/10"
            }`}
            style={
              activeTab === item.label
                ? { background: "hsl(211, 100%, 50%)", color: "white" }
                : { color: "hsl(220, 9%, 20%)" }
            }
          >
            <span className={activeTab === item.label ? "text-white" : "text-blue-500"}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-xl">
          {activeTab === "Overview" && (
            <>
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

            </>
          )}

          {activeTab === "Experience" && (
            <section>
              <h2 className="mb-6 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                Experience
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    role: "Senior Frontend Engineer",
                    company: "TechCorp",
                    period: "2023 - Present",
                    desc: "Leading frontend architecture and mentoring a team of 5 engineers. Optimized core web vitals by 40%.",
                  },
                  {
                    role: "Full-Stack Developer",
                    company: "StartupXYZ",
                    period: "2021 - 2023",
                    desc: "Built and scaled the core product from 0 to 50K users. Implemented real-time collaboration features.",
                  },
                  {
                    role: "Frontend Developer",
                    company: "DesignStudio",
                    period: "2019 - 2021",
                    desc: "Created pixel-perfect interfaces for enterprise clients including Fortune 500 companies.",
                  },
                ].map((job) => (
                  <div
                    key={job.role}
                    className="rounded-lg p-5"
                    style={{ border: "1px solid hsl(220, 13%, 90%)", background: "white" }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: "hsl(220, 9%, 12%)" }}>
                          {job.role}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: "hsl(211, 100%, 50%)" }}>
                          {job.company}
                        </p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(220, 9%, 35%)" }}>
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "Education" && (
            <section>
              <h2 className="mb-6 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    degree: "B.S. in Computer Science",
                    school: "University of Technology",
                    period: "2015 - 2019",
                    desc: "Focused on software engineering and human-computer interaction. Graduated with honors.",
                  },
                ].map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-lg p-5"
                    style={{ border: "1px solid hsl(220, 13%, 90%)", background: "white" }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: "hsl(220, 9%, 12%)" }}>
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: "hsl(211, 100%, 50%)" }}>
                          {edu.school}
                        </p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: "hsl(220, 9%, 46%)" }}>
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(220, 9%, 35%)" }}>
                      {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "Skills" && (
            <section>
              <h2 className="mb-6 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    category: "Frontend",
                    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
                  },
                  {
                    category: "Backend",
                    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "GraphQL"],
                  },
                  {
                    category: "Tools & DevOps",
                    skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"],
                  },
                  {
                    category: "Design",
                    skills: ["Figma", "UI/UX Design", "Responsive Design", "Prototyping"],
                  },
                ].map((group) => (
                  <div key={group.category} className="rounded-lg p-5" style={{ border: "1px solid hsl(220, 13%, 90%)", background: "white" }}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
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
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

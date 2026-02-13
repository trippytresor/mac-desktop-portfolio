"use client"

import { useState } from "react"
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle2 } from "lucide-react"

export function ContactApp() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="flex h-full">
      {/* Sidebar with socials */}
      <aside
        className="flex w-56 flex-shrink-0 flex-col p-5"
        style={{ background: "hsl(220, 14%, 96%)", borderRight: "1px solid hsl(220, 13%, 88%)" }}
      >
        <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 9%, 46%)" }}>
          Get in Touch
        </h2>

        <div className="flex flex-col gap-3">
          {[
            { icon: <Mail className="h-4 w-4" />, label: "Email", value: "hello@johndoe.dev" },
            { icon: <Github className="h-4 w-4" />, label: "GitHub", value: "@johndoe" },
            { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", value: "in/johndoe" },
            { icon: <Twitter className="h-4 w-4" />, label: "Twitter", value: "@johndoe" },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-black/5"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "hsl(211, 100%, 95%)", color: "hsl(211, 100%, 50%)" }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-[11px]" style={{ color: "hsl(220, 9%, 46%)" }}>
                  {item.label}
                </div>
                <div className="text-xs font-medium" style={{ color: "hsl(220, 9%, 20%)" }}>
                  {item.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-auto rounded-lg p-3" style={{ background: "hsl(211, 100%, 97%)" }}>
          <p className="text-[11px] leading-relaxed" style={{ color: "hsl(211, 100%, 35%)" }}>
            I&apos;m always open to discussing new projects and opportunities.
          </p>
        </div>
      </aside>

      {/* Contact form */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-md">
          <h1 className="mb-1 text-xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
            Send a Message
          </h1>
          <p className="mb-6 text-sm" style={{ color: "hsl(220, 9%, 46%)" }}>
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>

          {sent ? (
            <div
              className="flex flex-col items-center gap-3 rounded-xl p-8 text-center"
              style={{ background: "hsl(142, 71%, 95%)" }}
            >
              <CheckCircle2 className="h-10 w-10" style={{ color: "hsl(142, 71%, 40%)" }} />
              <div>
                <h3 className="font-semibold" style={{ color: "hsl(142, 71%, 25%)" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "hsl(142, 71%, 35%)" }}>
                  Thanks for reaching out. I&apos;ll respond shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "hsl(220, 14%, 96%)",
                      border: "1px solid hsl(220, 13%, 88%)",
                      color: "hsl(220, 9%, 12%)",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "hsl(220, 14%, 96%)",
                      border: "1px solid hsl(220, 13%, 88%)",
                      color: "hsl(220, 9%, 12%)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  required
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    background: "hsl(220, 14%, 96%)",
                    border: "1px solid hsl(220, 13%, 88%)",
                    color: "hsl(220, 9%, 12%)",
                  }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "hsl(220, 9%, 30%)" }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full resize-none rounded-lg px-3 py-2 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    background: "hsl(220, 14%, 96%)",
                    border: "1px solid hsl(220, 13%, 88%)",
                    color: "hsl(220, 9%, 12%)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors"
                style={{ background: "hsl(211, 100%, 50%)" }}
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

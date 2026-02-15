"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, Lock, Plus, Star, ExternalLink } from "lucide-react"

const BOOKMARKS = [
  { name: "GitHub", url: "github.com/treasurengonyama" },
  { name: "LinkedIn", url: "linkedin.com/in/treasurengonyama" },
  { name: "Portfolio Blog", url: "treasure.lab/blog" },
]

const BLOG_POSTS = [
  {
    title: "Building a macOS-Style Portfolio with Next.js",
    date: "Feb 10, 2026",
    excerpt:
      "How I created an interactive portfolio that mimics the macOS desktop experience using React, Next.js, and Tailwind CSS.",
    readTime: "5 min read",
  },
  {
    title: "The Art of Component Architecture in React",
    date: "Jan 28, 2026",
    excerpt:
      "Lessons learned from building scalable component systems that work across multiple products and teams.",
    readTime: "8 min read",
  },
  {
    title: "Why TypeScript Changed How I Think About Code",
    date: "Jan 15, 2026",
    excerpt:
      "A deep dive into how TypeScript's type system influences architectural decisions and makes codebases more maintainable.",
    readTime: "6 min read",
  },
  {
    title: "Optimizing Web Performance: A Practical Guide",
    date: "Dec 20, 2025",
    excerpt:
      "Real-world strategies for improving Core Web Vitals, from lazy loading to edge caching.",
    readTime: "10 min read",
  },
]

export function BrowserApp() {
  const [url, setUrl] = useState("treasure.lab/blog")

  return (
    <div className="flex h-full flex-col">
      {/* Browser toolbar */}
      <div
        className="flex flex-col gap-1 px-3 pb-1.5 pt-1"
        style={{ background: "hsl(220, 14%, 96%)", borderBottom: "1px solid hsl(220, 13%, 88%)" }}
      >
        {/* Navigation + URL */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <button className="rounded p-1 hover:bg-black/5 transition-colors" style={{ color: "hsl(220, 9%, 50%)" }} aria-label="Back">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded p-1 hover:bg-black/5 transition-colors" style={{ color: "hsl(220, 9%, 50%)" }} aria-label="Forward">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="rounded p-1 hover:bg-black/5 transition-colors" style={{ color: "hsl(220, 9%, 50%)" }} aria-label="Reload">
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div
            className="flex flex-1 items-center gap-1.5 rounded-md px-3 py-1.5"
            style={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 85%)",
            }}
          >
            <Lock className="h-3 w-3" style={{ color: "hsl(142, 71%, 45%)" }} />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent text-xs outline-none"
              style={{ color: "hsl(220, 9%, 30%)" }}
              aria-label="URL bar"
            />
            <Star className="h-3 w-3" style={{ color: "hsl(220, 9%, 60%)" }} />
          </div>

          <button className="rounded p-1 hover:bg-black/5 transition-colors" style={{ color: "hsl(220, 9%, 50%)" }} aria-label="New tab">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Bookmarks bar */}
        <div className="flex items-center gap-3 px-1">
          {BOOKMARKS.map((bm) => (
            <button
              key={bm.name}
              className="text-[11px] hover:text-foreground transition-colors"
              style={{ color: "hsl(220, 9%, 46%)" }}
            >
              {bm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto" style={{ background: "hsl(0, 0%, 100%)" }}>
        <div className="mx-auto max-w-2xl px-8 py-10">
          {/* Blog header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold" style={{ color: "hsl(220, 9%, 12%)" }}>
              treasure.lab
            </h1>
            <p className="mt-1 text-sm" style={{ color: "hsl(220, 9%, 46%)" }}>
              Thoughts on web development, design, and engineering.
            </p>
          </div>

          {/* Blog posts */}
          <div className="flex flex-col gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
                className="group cursor-pointer rounded-xl p-5 transition-colors hover:bg-black/[0.02]"
                style={{ border: "1px solid hsl(220, 13%, 90%)" }}
              >
                <div className="mb-2 flex items-center gap-2 text-xs" style={{ color: "hsl(220, 9%, 46%)" }}>
                  <time>{post.date}</time>
                  <span>{"/"}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mb-2 text-lg font-semibold group-hover:underline" style={{ color: "hsl(220, 9%, 12%)" }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(220, 9%, 40%)" }}>
                  {post.excerpt}
                </p>
                <div
                  className="mt-3 flex items-center gap-1 text-xs font-medium"
                  style={{ color: "hsl(211, 100%, 50%)" }}
                >
                  Read more
                  <ExternalLink className="h-3 w-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

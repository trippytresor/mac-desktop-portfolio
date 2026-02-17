"use client"

export function ShowreelApp() {
  return (
    <div className="flex h-full flex-col bg-black">
      <div className="relative flex-1">
        <iframe
          src="https://player.vimeo.com/video/712930144?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479?autoplay=1&muted=1"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title="Treasure Ngonyama - Showreel"
        />
      </div>
    </div>
  )
}

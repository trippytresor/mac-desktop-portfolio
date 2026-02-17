"use client"

import { useState } from "react"
import { ChevronLeft, Heart, Share, Download, Grid, MoreHorizontal } from "lucide-react"

interface Photo {
  id: string
  url: string
  title: string
  date: string
  location: string
  isFavorite?: boolean
}

const photos: Photo[] = [
  {
    id: "1",
    url: "/images/wallpaper.jpg",
    title: "Mountain Sunset",
    date: "June 12, 2024",
    location: "Dolomites, Italy",
  },
  {
    id: "2",
    url: "/images/wallpaper.png",
    title: "Abstract Waves",
    date: "July 24, 2024",
    location: "Digital Art",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    title: "Morning Mist",
    date: "May 15, 2024",
    location: "National Park",
    isFavorite: true,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
    title: "Enchanted Forest",
    date: "August 3, 2024",
    location: "Oregon, USA",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    title: "Alpine Lake",
    date: "September 10, 2024",
    location: "Swiss Alps",
    isFavorite: true,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    title: "Ancient Bridge",
    date: "October 22, 2024",
    location: "Kyoto, Japan",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    title: "Peak Reflections",
    date: "November 5, 2024",
    location: "Rocky Mountains",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=800&auto=format&fit=crop",
    title: "Desert Sands",
    date: "December 14, 2024",
    location: "Sahara Desert",
  }
]

export function PhotosApp() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  if (selectedPhoto) {
    return (
      <div className="flex h-full flex-col bg-black text-white select-none">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium hover:bg-white/10 transition-colors text-blue-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Photos
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold">{selectedPhoto.title}</span>
            <span className="text-[9px] opacity-60 uppercase tracking-wider">{selectedPhoto.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <Heart className={`h-4 w-4 ${selectedPhoto.isFavorite ? "fill-red-500 stroke-red-500" : ""}`} />
            </button>
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <Share className="h-4 w-4" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Full Image */}
        <div className="flex-1 relative flex items-center justify-center p-4 bg-black">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="max-h-full max-w-full object-contain shadow-2xl"
            draggable={false}
          />
        </div>

        {/* Footer Info */}
        <div className="px-6 py-4 bg-black/80 backdrop-blur-md text-center border-t border-white/10">
          <p className="text-[11px] opacity-60 font-medium">{selectedPhoto.location}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-white select-none">
      {/* Sidebar-less Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-900">Library</h1>
          <nav className="flex bg-gray-100/80 rounded-lg p-1 gap-1">
            <button className="px-3 py-1 text-[11px] font-semibold bg-white rounded-md shadow-sm text-gray-900">Years</button>
            <button className="px-3 py-1 text-[11px] font-semibold text-gray-500 hover:text-gray-700">Months</button>
            <button className="px-3 py-1 text-[11px] font-semibold text-gray-500 hover:text-gray-700">Days</button>
            <button className="px-3 py-1 text-[11px] font-semibold text-gray-500 hover:text-gray-700">All Photos</button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <Grid className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-6 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square overflow-hidden rounded-md bg-gray-50 transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {photo.isFavorite && (
                <div className="absolute bottom-1.5 right-1.5">
                  <Heart className="h-3 w-3 fill-white stroke-white drop-shadow-md" />
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="mt-12 text-center pb-8">
          <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase">{photos.length} Photos</p>
        </div>
      </div>
    </div>
  )
}

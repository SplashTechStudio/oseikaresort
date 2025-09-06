"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface HeroSliderProps {
  onBookNow: () => void
  onSeeMenu: () => void
}

const heroSlides = [
  {
    id: 1,
    image: "/12.jpg",
    title: "Welcome to Osieka Resort",
    subtitle: "Where serene nature meets unmatched hospitality",
    description:
      "Your ideal destination for mouthwatering cuisine, luxurious lodging, and refreshing drinks—all in a peaceful and scenic environment.",
  },
  {
    id: 2,
    image: "/10.jpg",
    title: "Relax in Paradise",
    subtitle: "Surrounded by lush gardens and tranquil waters",
    description:
      "Immerse yourself in the beauty of nature while enjoying world-class amenities and exceptional service.",
  },
  {
    id: 3,
    image: "/4.jpg",
    title: "Luxury Accommodations",
    subtitle: "Comfort and elegance in every detail",
    description:
      "Experience our beautifully appointed rooms and suites, each designed to provide the ultimate in comfort and relaxation.",
  },
  {
    id: 4,
    image: "/22.jpeg",
    title: "Culinary Excellence",
    subtitle: "Fresh, local ingredients crafted with passion",
    description:
      "Savor the finest local and continental cuisine prepared by our expert chefs using the freshest seasonal ingredients.",
  },
  {
    id: 5,
    image: "/13.jpg",
    title: "Unwind & Celebrate",
    subtitle: "Perfect moments under the African sky",
    description:
      "Join us for cocktails at sunset, enjoy our bonfire experiences, and create memories that will last a lifetime.",
  },
]

export function HeroSlider({ onBookNow, onSeeMenu }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">{heroSlides[currentSlide].title}</h1>
          <p className="text-xl md:text-2xl mb-4 animate-fade-in-delay-1">{heroSlides[currentSlide].subtitle}</p>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-delay-2">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3 transform hover:scale-105 transition-all duration-200"
              onClick={onBookNow}
            >
              Book a Room
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-200"
              onClick={onSeeMenu}
            >
              See Our Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
          }}
        />
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1 h-3 bg-white mr-0.5"></div>
              <div className="w-1 h-3 bg-white"></div>
            </div>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
          )}
        </button>
      </div>
    </section>
  )
}

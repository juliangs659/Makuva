"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, ChevronRight, Compass, Sun, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const backgroundImages = [
  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564596823821-78fac1bc83a1?q=80&w=1200&h=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1200&h=600&auto=format&fit=crop",
]

export default function Hero() {
  const [destination, setDestination] = useState("")
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (destination.trim()) {
      router.push(`/planner?destination=${encodeURIComponent(destination)}`)
    }
  }

  return (
    <div className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {backgroundImages.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${img})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentBgIndex === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-makuva-900/20 to-makuva-900"
        style={{ backgroundSize: "400% 400%" }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 text-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Descubre Tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-ember-600">Makuva</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto text-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explora senderos únicos y crea aventuras inolvidables
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          className={`flex w-full max-w-md mx-auto mb-10 glass-effect rounded-full p-1 transition-all duration-300 ${
            isSearchExpanded ? "ring-2 ring-makuva-400" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center pl-4 text-makuva-200">
            <MapPin className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="¿A dónde te lleva tu Makuva?"
            className="rounded-full h-12 bg-transparent border-none text-white placeholder:text-makuva-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
          />
          <Button
            type="submit"
            className="rounded-full h-10 px-6 bg-gradient-to-r from-ember-500 to-ember-600 hover:from-ember-600 hover:to-ember-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Search className="mr-2 h-5 w-5" />
            Explorar
          </Button>
        </motion.form>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            variant="link"
            className="text-white flex items-center group hover:text-ember-300 transition-colors duration-300"
          >
            <Compass className="mr-2 h-4 w-4" />
            <span>Destinos populares</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="link"
            className="text-white flex items-center group hover:text-makuva-300 transition-colors duration-300"
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Rutas recomendadas</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="link"
            className="text-white flex items-center group hover:text-river-300 transition-colors duration-300"
          >
            <Mountain className="mr-2 h-4 w-4" />
            <span>Experiencias únicas</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-makuva-900 to-transparent z-10" />
    </div>
  )
}


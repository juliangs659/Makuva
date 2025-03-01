"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Cartagena",
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc0?q=80&w=600&auto=format&fit=crop",
    description: "Ciudad histórica con playas y arquitectura colonial",
    rating: 4.8,
    activities: 42,
    duration: "3-5 días",
  },
  {
    id: 2,
    name: "Medellín",
    image: "https://images.unsplash.com/photo-1599407384144-6d7f0bd0a58c?q=80&w=600&auto=format&fit=crop",
    description: "La ciudad de la eterna primavera con cultura vibrante",
    rating: 4.7,
    activities: 38,
    duration: "3-4 días",
  },
  {
    id: 3,
    name: "Bogotá",
    image: "https://images.unsplash.com/photo-1628105541664-ae6ee8d261db?q=80&w=600&auto=format&fit=crop",
    description: "Capital cultural con museos y gastronomía diversa",
    rating: 4.6,
    activities: 56,
    duration: "4-6 días",
  },
  {
    id: 4,
    name: "Santa Marta",
    image: "https://images.unsplash.com/photo-1621478374422-35206faedbd9?q=80&w=600&auto=format&fit=crop",
    description: "Playas paradisíacas y el Parque Tayrona",
    rating: 4.9,
    activities: 35,
    duration: "4-7 días",
  },
]

export default function FeaturedDestinations() {
  const router = useRouter()

  const handleDestinationClick = (destination: string) => {
    router.push(`/planner?destination=${encodeURIComponent(destination)}`)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-makuva-50 to-white dark:from-makuva-900 dark:to-makuva-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-makuva-100 text-makuva-800 border-makuva-200 rounded-full">
            Destinos Destacados
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-makuva-900 dark:text-makuva-100">
            Explora Destinos Populares
          </h2>
          <p className="text-makuva-700 dark:text-makuva-300 max-w-2xl mx-auto">
            Descubre los lugares más visitados por viajeros de todo el mundo y comienza a planificar tu próxima
            aventura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden border-none shadow-lg card-hover bg-white dark:bg-makuva-800"
              onClick={() => handleDestinationClick(destination.name)}
            >
              <div className="relative">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${destination.image})` }} />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-ember-500 text-white hover:bg-ember-600">{destination.rating} ★</Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-xl font-bold mb-2 flex items-center text-makuva-800 dark:text-makuva-100">
                  <MapPin className="h-4 w-4 mr-1 text-ember-500" />
                  {destination.name}
                </h3>

                <p className="text-makuva-600 dark:text-makuva-300 mb-4 line-clamp-2">{destination.description}</p>

                <div className="flex justify-between items-center text-sm text-makuva-500 dark:text-makuva-400 mb-5">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{destination.activities} actividades</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-makuva hover:opacity-90 transition-opacity text-white"
                  onClick={() => handleDestinationClick(destination.name)}
                >
                  Explorar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


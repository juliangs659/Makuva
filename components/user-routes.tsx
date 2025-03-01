"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Heart } from "lucide-react"

// Tipo para las rutas de usuario
type UserRoute = {
  id: string
  title: string
  description: string
  image: string
  location: string
  duration: string
  likes: number
  creator: {
    name: string
    avatar: string
  }
}

// Datos de ejemplo
const userRoutes: UserRoute[] = [
  {
    id: "1",
    title: "Aventura en la Sierra Nevada",
    description: "Un recorrido de 5 días por los paisajes más impresionantes de la Sierra Nevada de Santa Marta.",
    image: "https://images.unsplash.com/photo-1609784969374-dfb3c6f0c7a7?q=80&w=600&auto=format&fit=crop",
    location: "Sierra Nevada, Colombia",
    duration: "5 días",
    likes: 124,
    creator: {
      name: "Laura Gómez",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    },
  },
  {
    id: "2",
    title: "Ruta del Café en el Eje Cafetero",
    description: "Descubre la cultura cafetera colombiana en este recorrido por las fincas más emblemáticas.",
    image: "https://images.unsplash.com/photo-1598938549670-a4d0d4500403?q=80&w=600&auto=format&fit=crop",
    location: "Eje Cafetero, Colombia",
    duration: "3 días",
    likes: 98,
    creator: {
      name: "Carlos Martínez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    id: "3",
    title: "Explorando la Amazonía Colombiana",
    description: "Una aventura única en la selva amazónica, conociendo su biodiversidad y culturas indígenas.",
    image: "https://images.unsplash.com/photo-1571690584414-fa2a1127a2e3?q=80&w=600&auto=format&fit=crop",
    location: "Amazonas, Colombia",
    duration: "7 días",
    likes: 156,
    creator: {
      name: "Ana Rodríguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  },
]

export function UserRoutes() {
  const router = useRouter()
  const [routes, setRoutes] = useState(userRoutes)

  const handleLike = (id: string) => {
    setRoutes(routes.map((route) => (route.id === id ? { ...route, likes: route.likes + 1 } : route)))
  }

  const handleRouteClick = (id: string) => {
    router.push(`/ruta/${id}`)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-makuva-50 dark:from-makuva-900 dark:to-makuva-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-makuva-100 text-makuva-800 border-makuva-200 rounded-full">
            Inspiración para tu viaje
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-makuva-900 dark:text-makuva-100">
            Rutas creadas por la comunidad
          </h2>
          <p className="text-makuva-700 dark:text-makuva-300 max-w-2xl mx-auto">
            Descubre itinerarios únicos creados por viajeros apasionados y encuentra inspiración para tu próxima
            aventura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <Card
              key={route.id}
              className="overflow-hidden border-none shadow-lg card-hover bg-white dark:bg-makuva-800 cursor-pointer"
              onClick={() => handleRouteClick(route.id)}
            >
              <div className="relative">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${route.image})` }} />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-ember-500 text-white hover:bg-ember-600">{route.duration}</Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-xl font-bold mb-2 text-makuva-800 dark:text-makuva-100">{route.title}</h3>
                <p className="text-makuva-600 dark:text-makuva-300 mb-4 line-clamp-2">{route.description}</p>

                <div className="flex justify-between items-center text-sm text-makuva-500 dark:text-makuva-400 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-ember-500" />
                    <span>{route.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-river-500" />
                    <span>Por {route.creator.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-makuva-600 hover:text-ember-500 dark:text-makuva-300 dark:hover:text-ember-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(route.id)
                    }}
                  >
                    <Heart className="h-5 w-5 mr-1" />
                    {route.likes}
                  </Button>
                  <Button size="sm" className="bg-gradient-makuva hover:opacity-90 transition-opacity text-white">
                    Ver ruta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


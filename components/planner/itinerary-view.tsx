"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  Calendar,
  Info,
  ArrowRight,
  Coffee,
  Utensils,
  Camera,
  Bed,
  Navigation,
  Star,
  Share2,
} from "lucide-react"
import type { PointOfInterest } from "@/types"

interface ItineraryViewProps {
  destination: string
  points: PointOfInterest[]
}

export default function ItineraryView({ destination, points }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState("day1")

  // Organizar puntos por día (en una app real, esto sería más complejo)
  const days = 3
  const pointsPerDay = Math.ceil(points.length / days)

  const itinerary = Array.from({ length: days }).map((_, i) => {
    const dayPoints = points.slice(i * pointsPerDay, (i + 1) * pointsPerDay)
    return {
      day: i + 1,
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      points: dayPoints,
    }
  })

  // Iconos por categoría
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "restaurante":
        return <Utensils className="h-5 w-5" />
      case "café":
        return <Coffee className="h-5 w-5" />
      case "hotel":
        return <Bed className="h-5 w-5" />
      default:
        return <Camera className="h-5 w-5" />
    }
  }

  if (points.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <Card className="max-w-md mx-auto border-none shadow-lg">
          <CardContent className="p-10 text-center">
            <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Info className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No hay puntos seleccionados</h2>
            <p className="text-muted-foreground mb-6">
              Selecciona puntos de interés en la pestaña "Explorar" para generar un itinerario personalizado.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full px-6"
            >
              Volver a explorar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full">
          Tu Itinerario
        </Badge>
        <h2 className="text-3xl font-bold mb-3">Tu aventura en {destination}</h2>
        <p className="text-muted-foreground">
          Hemos organizado tus {points.length} lugares seleccionados en un itinerario de {days} días.
        </p>
      </div>

      <Tabs value={activeDay} onValueChange={setActiveDay} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-full">
          {itinerary.map((day) => (
            <TabsTrigger
              key={`day${day.day}`}
              value={`day${day.day}`}
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Día {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {itinerary.map((day) => (
          <TabsContent key={`day${day.day}`} value={`day${day.day}`} className="space-y-8 animate-fade-in">
            <div className="flex items-center">
              <div className="bg-primary/10 text-primary p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-xl font-medium capitalize">{day.date}</span>
            </div>

            <div className="space-y-8">
              {day.points.map((point, index) => (
                <div key={point.id} className="relative">
                  {index < day.points.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/20 rounded-full z-0" />
                  )}

                  <Card className="relative z-10 border-none shadow-lg overflow-hidden card-hover">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-4">
                        <div
                          className="h-56 md:h-auto bg-cover bg-center md:col-span-1 relative"
                          style={{ backgroundImage: `url(${point.image})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-primary text-white border-none shadow-md">
                              {new Date(8 * 60 * 60 * 1000 + index * 2 * 60 * 60 * 1000).toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6 md:col-span-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div className="flex items-center mb-3 md:mb-0">
                              <div className="bg-primary/10 text-primary p-3 rounded-full mr-3 shadow-md">
                                {getCategoryIcon(point.category)}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{point.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span className="truncate">{point.address}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center text-yellow-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < point.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-muted-foreground">({point.reviewCount})</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-5">{point.description}</p>

                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-full">
                              <Clock className="h-4 w-4 mr-1 text-primary" />
                              <span>{point.recommendedTime}</span>
                            </div>

                            <div className="flex gap-2 mt-3 md:mt-0">
                              <Button variant="outline" size="sm" className="rounded-full">
                                <MapPin className="h-4 w-4 mr-1" />
                                Ver en mapa
                              </Button>
                              <Button size="sm" className="rounded-full bg-gradient-primary hover:opacity-90">
                                <Navigation className="h-4 w-4 mr-1" />
                                Cómo llegar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {index < day.points.length - 1 && (
                    <div className="flex justify-center my-4 relative z-10">
                      <div className="bg-white dark:bg-gray-800 shadow-md px-4 py-2 rounded-full text-sm flex items-center border">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">{Math.floor(Math.random() * 20) + 10} min</span>
                        <span className="text-muted-foreground ml-1">en transporte</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full px-8 py-6 h-auto">
                <Share2 className="h-5 w-5 mr-2" />
                Compartir este itinerario
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}


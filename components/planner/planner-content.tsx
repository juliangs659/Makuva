"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, MapPin, Calendar, Share2, Filter, SlidersHorizontal } from "lucide-react"
import MapView from "@/components/planner/map-view"
import PointOfInterestList from "@/components/planner/point-of-interest-list"
import ItineraryView from "@/components/planner/itinerary-view"
import { fetchPointsOfInterest } from "@/lib/api"
import type { PointOfInterest } from "@/types"

export default function PlannerContent({ destination }: { destination: string }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([])
  const [selectedPoints, setSelectedPoints] = useState<PointOfInterest[]>([])
  const [activeTab, setActiveTab] = useState("explore")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (destination) {
      setIsLoading(true)
      // Simulamos la carga de datos desde una API
      fetchPointsOfInterest(destination)
        .then((data) => {
          setPointsOfInterest(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching points of interest:", error)
          setIsLoading(false)
        })
    }
  }, [destination])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí implementaríamos la búsqueda real con filtros
    console.log("Searching for:", searchQuery)
  }

  const togglePointSelection = (point: PointOfInterest) => {
    if (selectedPoints.some((p) => p.id === point.id)) {
      setSelectedPoints(selectedPoints.filter((p) => p.id !== point.id))
    } else {
      setSelectedPoints([...selectedPoints, point])
    }
  }

  const generateItinerary = () => {
    setActiveTab("itinerary")
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b shadow-sm p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="mr-2 text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold flex items-center">
              {destination ? (
                <>
                  <span className="text-primary mr-2">Planificando viaje a</span>
                  <span>{destination}</span>
                </>
              ) : (
                "Planificador de viaje"
              )}
            </h1>
          </div>

          <form onSubmit={handleSearch} className="flex w-full max-w-md">
            <Input
              type="text"
              placeholder="Buscar puntos de interés..."
              className="rounded-l-full border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-r-full bg-gradient-primary hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b bg-white dark:bg-gray-900 sticky top-[73px] z-10 shadow-sm">
            <div className="max-w-7xl mx-auto">
              <TabsList className="h-16 bg-transparent">
                <TabsTrigger
                  value="explore"
                  className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Explorar
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Itinerario
                </TabsTrigger>
                <TabsTrigger
                  value="share"
                  className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="explore" className="flex-1 overflow-hidden p-0 m-0">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              <div className="md:col-span-1 border-r overflow-y-auto">
                <div className="sticky top-0 z-10 p-4 bg-white dark:bg-gray-900 border-b flex items-center justify-between">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Ordenar
                  </Button>
                </div>

                <PointOfInterestList
                  points={pointsOfInterest}
                  selectedPoints={selectedPoints}
                  onTogglePoint={togglePointSelection}
                  isLoading={isLoading}
                />

                {selectedPoints.length > 0 && (
                  <div className="p-4 border-t bg-white dark:bg-gray-900 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <Button
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity h-12 rounded-full"
                      onClick={generateItinerary}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Generar itinerario ({selectedPoints.length})
                    </Button>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 h-full">
                <MapView
                  destination={destination}
                  points={pointsOfInterest}
                  selectedPoints={selectedPoints}
                  onTogglePoint={togglePointSelection}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="flex-1 overflow-auto p-0 m-0">
            <ItineraryView destination={destination} points={selectedPoints} />
          </TabsContent>

          <TabsContent value="share" className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto p-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                  <Share2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Comparte tu itinerario</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Comparte tu ruta personalizada con amigos o guárdala para consultarla más tarde
                </p>
              </div>

              {selectedPoints.length > 0 ? (
                <div className="space-y-8">
                  <div className="p-8 border rounded-xl shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Tu ruta en {destination}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Has seleccionado {selectedPoints.length} lugares para visitar en tu itinerario.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedPoints.map((point) => (
                        <div
                          key={point.id}
                          className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {point.name}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full px-6">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir enlace
                      </Button>
                      <Button variant="outline" className="rounded-full px-6">
                        Descargar PDF
                      </Button>
                    </div>
                  </div>

                  <div className="p-8 border rounded-xl shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold mb-6">Compartir en redes sociales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-12 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                      >
                        Facebook
                      </Button>
                      <Button variant="outline" className="h-12 bg-sky-50 text-sky-600 hover:bg-sky-100 border-sky-200">
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 border rounded-xl shadow-md bg-white dark:bg-gray-800">
                  <div className="bg-muted/50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No hay lugares seleccionados</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    No has seleccionado ningún punto de interés todavía. Explora y selecciona lugares para crear tu
                    itinerario.
                  </p>
                  <Button
                    className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full px-6"
                    onClick={() => setActiveTab("explore")}
                  >
                    Explorar puntos de interés
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


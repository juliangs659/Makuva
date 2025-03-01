import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin, Info, ExternalLink } from "lucide-react"
import type { PointOfInterest } from "@/types"

interface PointOfInterestListProps {
  points: PointOfInterest[]
  selectedPoints: PointOfInterest[]
  onTogglePoint: (point: PointOfInterest) => void
  isLoading: boolean
}

export default function PointOfInterestList({
  points,
  selectedPoints,
  onTogglePoint,
  isLoading,
}: PointOfInterestListProps) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-20" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-md">
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (points.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="bg-muted/50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <Info className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No se encontraron lugares</h3>
        <p className="text-muted-foreground mb-6">No se encontraron puntos de interés para este destino.</p>
        <Button variant="outline">Cambiar destino</Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Puntos de interés</h2>
        <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
          {points.length} lugares
        </Badge>
      </div>

      <div className="space-y-6">
        {points.map((point) => {
          const isSelected = selectedPoints.some((p) => p.id === point.id)

          return (
            <Card
              key={point.id}
              className={`overflow-hidden cursor-pointer transition-all duration-300 border-none shadow-md ${
                isSelected ? "ring-2 ring-primary" : ""
              } card-hover`}
              onClick={() => onTogglePoint(point)}
            >
              <CardContent className="p-0">
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${point.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-white/90 text-primary hover:bg-white/80 shadow-md">{point.category}</Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-lg mb-1">{point.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{point.address}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-sm">
                      <div className="flex items-center text-yellow-500 mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < point.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">{point.reviewCount} reseñas</span>
                    </div>

                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onTogglePoint(point)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{point.description}</p>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{point.recommendedTime}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 p-0 h-auto"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Aquí iría la lógica para ver más detalles
                      }}
                    >
                      <span className="mr-1">Ver detalles</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}


"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { PointOfInterest } from "@/types"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, Navigation } from "lucide-react"

// Normalmente usaríamos una variable de entorno para esto
// pero para este ejemplo usamos una clave de demostración
const MAPBOX_TOKEN = "pk.demo.key"

interface MapViewProps {
  destination: string
  points: PointOfInterest[]
  selectedPoints: PointOfInterest[]
  onTogglePoint: (point: PointOfInterest) => void
}

export default function MapView({ destination, points, selectedPoints, onTogglePoint }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState("streets-v11")

  // Inicializar el mapa
  useEffect(() => {
    if (!mapContainer.current) return

    // En una implementación real, usaríamos geocodificación para obtener las coordenadas del destino
    // Para este ejemplo, usamos coordenadas predefinidas
    const destinationCoords = {
      Cartagena: [-75.5426, 10.3997],
      Medellín: [-75.5636, 6.2518],
      Bogotá: [-74.0721, 4.711],
      "Santa Marta": [-74.211, 11.2404],
    }

    const defaultCoords = [-74.2973, 4.5709] // Colombia
    const coords =
      destination && destinationCoords[destination as keyof typeof destinationCoords]
        ? destinationCoords[destination as keyof typeof destinationCoords]
        : defaultCoords

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: coords as [number, number],
      zoom: 12,
    })

    // Añadir controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right")

    // Añadir control de geolocalización
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "bottom-right",
    )

    map.current.on("load", () => {
      setMapLoaded(true)
    })

    return () => {
      map.current?.remove()
    }
  }, [destination, mapStyle])

  // Cambiar estilo del mapa
  const changeMapStyle = (style: string) => {
    setMapStyle(style)
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`)
    }
  }

  // Añadir marcadores al mapa
  useEffect(() => {
    if (!mapLoaded || !map.current) return

    // Eliminar marcadores existentes
    const markers = document.querySelectorAll(".mapboxgl-marker")
    markers.forEach((marker) => marker.remove())

    // Añadir nuevos marcadores
    points.forEach((point) => {
      const isSelected = selectedPoints.some((p) => p.id === point.id)

      const el = document.createElement("div")
      el.className = "cursor-pointer transition-all duration-300 hover:scale-110"
      el.innerHTML = `
        <div class="${isSelected ? "text-white bg-primary shadow-lg shadow-primary/30" : "text-primary bg-white"} 
                    p-2 rounded-full shadow-md border-2 border-primary flex items-center justify-center transform transition-transform"
             style="width: 44px; height: 44px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `

      el.addEventListener("click", () => {
        onTogglePoint(point)
      })

      // Añadir popup con información más detallada
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        maxWidth: "300px",
        className: "custom-popup",
      }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-base mb-1">${point.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${point.category}</p>
            <div class="flex items-center text-sm text-yellow-500 mb-2">
              ${Array(Math.floor(point.rating)).fill("★").join("")}
              <span class="text-gray-500 ml-1">(${point.reviewCount})</span>
            </div>
            <p class="text-xs text-gray-500 line-clamp-2">${point.description}</p>
          </div>
        `)

      // Crear y añadir el marcador
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat([point.longitude, point.latitude])
        .setPopup(popup)
        .addTo(map.current!)
    })

    // Si hay puntos seleccionados, dibujar una línea entre ellos
    if (selectedPoints.length > 1 && map.current) {
      const coordinates = selectedPoints.map((point) => [point.longitude, point.latitude])

      if (map.current.getSource("route")) {
        ;(map.current.getSource("route") as mapboxgl.GeoJSONSource).setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates as [number, number][],
          },
        })
      } else {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates as [number, number][],
            },
          },
        })

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "hsl(var(--primary))",
            "line-width": 4,
            "line-opacity": 0.8,
            "line-dasharray": [0.5, 1.5],
          },
        })

        // Añadir efecto de animación a la ruta
        map.current.addLayer({
          id: "route-animation",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "white",
            "line-width": 2,
            "line-opacity": 0.9,
            "line-dasharray": [0, 4, 3],
          },
        })
      }
    }
  }, [points, selectedPoints, mapLoaded, onTogglePoint])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Controles de mapa */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="glass-effect shadow-lg"
          onClick={() => changeMapStyle("streets-v11")}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Calles
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="glass-effect shadow-lg"
          onClick={() => changeMapStyle("satellite-v9")}
        >
          <Layers className="h-4 w-4 mr-2" />
          Satélite
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="glass-effect shadow-lg"
          onClick={() => changeMapStyle("outdoors-v11")}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Terreno
        </Button>
      </div>

      {/* Información del destino */}
      {destination && (
        <div className="absolute bottom-4 left-4 z-10 glass-effect p-3 rounded-lg shadow-lg max-w-xs">
          <h3 className="font-bold flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            {destination}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{selectedPoints.length} lugares seleccionados</p>
        </div>
      )}
    </div>
  )
}


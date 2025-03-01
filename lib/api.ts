import type { PointOfInterest } from "@/types"

// Datos simulados para puntos de interés
const mockPointsOfInterest: Record<string, PointOfInterest[]> = {
  Cartagena: [
    {
      id: "1",
      name: "Ciudad Amurallada",
      category: "Atracción",
      description:
        "Centro histórico de Cartagena rodeado de murallas coloniales con calles empedradas, plazas y arquitectura colorida.",
      address: "Centro Histórico, Cartagena",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.4236,
      longitude: -75.5503,
      rating: 4.8,
      reviewCount: 1245,
      recommendedTime: "3-4 horas",
    },
    {
      id: "2",
      name: "Castillo San Felipe",
      category: "Atracción",
      description:
        "Imponente fortaleza española construida en el siglo XVII para defender la ciudad de ataques piratas.",
      address: "Carrera 17, Cartagena",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.4225,
      longitude: -75.5402,
      rating: 4.6,
      reviewCount: 987,
      recommendedTime: "2 horas",
    },
    {
      id: "3",
      name: "Playa Blanca",
      category: "Playa",
      description:
        "Hermosa playa de arena blanca y aguas cristalinas en la Isla de Barú, perfecta para nadar y relajarse.",
      address: "Isla de Barú, Cartagena",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.2377,
      longitude: -75.5849,
      rating: 4.5,
      reviewCount: 1120,
      recommendedTime: "Todo el día",
    },
    {
      id: "4",
      name: "Restaurante Alma",
      category: "Restaurante",
      description:
        "Restaurante elegante que sirve cocina colombiana contemporánea con ingredientes locales de alta calidad.",
      address: "Calle del Colegio #34-60, Centro Histórico",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.4242,
      longitude: -75.5501,
      rating: 4.7,
      reviewCount: 658,
      recommendedTime: "2 horas",
    },
    {
      id: "5",
      name: "Café del Mar",
      category: "Café",
      description: "Bar lounge ubicado sobre la muralla con vistas espectaculares al atardecer y cócteles tropicales.",
      address: "Baluarte de Santo Domingo, Centro",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.4267,
      longitude: -75.5521,
      rating: 4.4,
      reviewCount: 892,
      recommendedTime: "2-3 horas",
    },
    {
      id: "6",
      name: "Islas del Rosario",
      category: "Atracción",
      description: "Archipiélago de 27 islas con arrecifes de coral, ideal para snorkel y buceo en aguas cristalinas.",
      address: "Parque Nacional Natural Corales del Rosario",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 10.1811,
      longitude: -75.74,
      rating: 4.9,
      reviewCount: 1432,
      recommendedTime: "Todo el día",
    },
  ],
  Medellín: [
    {
      id: "7",
      name: "Parque Arví",
      category: "Parque",
      description:
        "Extenso parque ecológico accesible en teleférico con senderos para caminatas, mercado campesino y actividades al aire libre.",
      address: "Corregimiento de Santa Elena",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 6.2782,
      longitude: -75.5003,
      rating: 4.7,
      reviewCount: 1089,
      recommendedTime: "4-5 horas",
    },
    {
      id: "8",
      name: "Plaza Botero",
      category: "Atracción",
      description: "Plaza pública con 23 esculturas donadas por el famoso artista colombiano Fernando Botero.",
      address: "Cra. 52 #52-01, La Candelaria",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 6.2518,
      longitude: -75.5636,
      rating: 4.5,
      reviewCount: 876,
      recommendedTime: "1-2 horas",
    },
  ],
  Bogotá: [
    {
      id: "9",
      name: "Museo del Oro",
      category: "Museo",
      description: "Impresionante colección de más de 34,000 piezas de oro precolombino y otros materiales.",
      address: "Cra. 6 #15-88, La Candelaria",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 4.6012,
      longitude: -74.0718,
      rating: 4.8,
      reviewCount: 1567,
      recommendedTime: "2-3 horas",
    },
    {
      id: "10",
      name: "Monserrate",
      category: "Atracción",
      description: "Montaña emblemática con santuario religioso y vistas panorámicas de la ciudad.",
      address: "Paseo Bolívar, Monserrate",
      image: "/placeholder.svg?height=200&width=300",
      latitude: 4.6057,
      longitude: -74.0558,
      rating: 4.7,
      reviewCount: 1345,
      recommendedTime: "3-4 horas",
    },
  ],
}

// Función para obtener puntos de interés
export async function fetchPointsOfInterest(destination: string): Promise<PointOfInterest[]> {
  // Simulamos una llamada a API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Devolvemos los datos simulados para el destino o un array vacío
  return mockPointsOfInterest[destination] || []
}

// Función para obtener detalles de un punto de interés
export async function fetchPointOfInterestDetails(id: string): Promise<PointOfInterest | null> {
  // Simulamos una llamada a API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Buscamos el punto de interés en todos los destinos
  for (const destination in mockPointsOfInterest) {
    const point = mockPointsOfInterest[destination].find((p) => p.id === id)
    if (point) return point
  }

  return null
}


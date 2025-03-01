import { Search, MapPin, Calendar, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    icon: <Search className="h-12 w-12" />,
    title: "Busca lugares",
    description: "Encuentra los mejores puntos de interés, restaurantes y atracciones.",
    color: "bg-blue-500",
  },
  {
    icon: <MapPin className="h-12 w-12" />,
    title: "Selecciona favoritos",
    description: "Elige los lugares que quieres visitar durante tu viaje.",
    color: "bg-purple-500",
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Genera itinerario",
    description: "Crea automáticamente una ruta optimizada para tu visita.",
    color: "bg-pink-500",
  },
  {
    icon: <Share2 className="h-12 w-12" />,
    title: "Comparte tu ruta",
    description: "Comparte tu itinerario con amigos o guárdalo para después.",
    color: "bg-indigo-500",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full">
            Proceso Simple
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crear tu itinerario personalizado es fácil y rápido con estos simples pasos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Línea conectora entre pasos (excepto el último) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gray-200 dark:bg-gray-700 z-0" />
              )}

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative z-10 h-full flex flex-col items-center text-center card-hover">
                <div
                  className={`inline-flex items-center justify-center h-24 w-24 rounded-full ${step.color} text-white mb-6 animate-pulse-slow`}
                >
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center border-2 border-primary">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


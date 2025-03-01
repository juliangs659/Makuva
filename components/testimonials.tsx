import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { MapPin } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María González",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Bogotá",
    rating: 5,
    text: "Gracias a esta aplicación pude planificar mi viaje a Cartagena sin complicaciones. ¡Descubrí lugares que no aparecen en las guías turísticas tradicionales!",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Medellín",
    rating: 4,
    text: "La función de generar itinerarios me ahorró horas de planificación. Pude optimizar mi tiempo y visitar todos los lugares que quería ver.",
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Cali",
    rating: 5,
    text: "Los mapas interactivos y las recomendaciones personalizadas hicieron que mi viaje a Santa Marta fuera inolvidable. ¡Definitivamente volveré a usar esta app!",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-makuva-50 to-white dark:from-makuva-900 dark:to-makuva-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 py-1 bg-makuva-100 text-makuva-800 border-makuva-200 rounded-full">
            Testimonios
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-makuva-900 dark:text-makuva-100">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-makuva-700 dark:text-makuva-300 max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma ha ayudado a miles de viajeros a crear experiencias inolvidables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="h-full overflow-visible relative card-hover border-none shadow-lg bg-white dark:bg-makuva-800"
            >
              {/* Comillas decorativas */}
              <div className="absolute -top-6 -left-6 bg-ember-500 text-white p-3 rounded-full shadow-lg">
                <Quote className="h-6 w-6" />
              </div>

              <CardContent className="p-8 flex flex-col h-full">
                {/* Estrellas de valoración */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-ember-400 text-ember-400" : "text-makuva-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-makuva-600 dark:text-makuva-300 flex-grow mb-6 italic">"{testimonial.text}"</p>

                <div className="flex items-center mt-auto pt-4 border-t border-makuva-200 dark:border-makuva-700">
                  <Avatar className="h-12 w-12 mr-4 ring-2 ring-makuva-200 dark:ring-makuva-700">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-makuva-800 dark:text-makuva-100">{testimonial.name}</p>
                    <p className="text-sm text-makuva-500 dark:text-makuva-400 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


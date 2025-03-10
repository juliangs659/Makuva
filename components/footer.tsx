import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="bg-makuva-900 text-makuva-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-makuva-300 mb-4">
              Descubre tu camino con Makuva. Planifica tus aventuras, crea recuerdos inolvidables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-makuva-300 hover:text-ember-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-makuva-300 hover:text-ember-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-makuva-300 hover:text-ember-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-makuva-300 hover:text-ember-400">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-makuva-300 hover:text-ember-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/rutas" className="text-makuva-300 hover:text-ember-400">
                  Mis Rutas
                </Link>
              </li>
              <li>
                <Link href="/explorar" className="text-makuva-300 hover:text-ember-400">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-makuva-300 hover:text-ember-400">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-makuva-300 hover:text-ember-400">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-makuva-300 hover:text-ember-400">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-makuva-300 hover:text-ember-400">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-makuva-300 hover:text-ember-400">
                  Términos de servicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-makuva-700 text-center text-makuva-400">
          <p>&copy; {new Date().getFullYear()} Makuva. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


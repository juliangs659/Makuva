"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, User, LogOut, Settings, MapPin, Compass, Info, Mountain } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Logo } from "@/components/ui/logo"

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Inicio", icon: <MapPin className="w-4 h-4 mr-2" /> },
    { href: "/rutas", label: "Mis Rutas", icon: <Compass className="w-4 h-4 mr-2" /> },
    { href: "/explorar", label: "Explorar", icon: <Mountain className="w-4 h-4 mr-2" /> },
    { href: "/about", label: "Acerca de", icon: <Info className="w-4 h-4 mr-2" /> },
  ]

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-makuva-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Logo className={`transition-colors duration-300 ${isScrolled ? "text-makuva-100" : "text-white"}`} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center
                  ${
                    pathname === item.href
                      ? isScrolled
                        ? "text-ember-400 bg-makuva-800/50"
                        : "text-ember-400 bg-makuva-800/30"
                      : isScrolled
                        ? "text-makuva-100 hover:bg-makuva-800/50"
                        : "text-white/80 hover:bg-makuva-800/30"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-makuva-800 text-makuva-100">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-ember-500 hover:bg-ember-600 text-white">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-makuva-400 ${
                isScrolled ? "text-makuva-100 hover:bg-makuva-800/50" : "text-white hover:bg-makuva-800/30"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <motion.div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-makuva-800">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                pathname === item.href ? "text-ember-400 bg-makuva-700" : "text-makuva-100 hover:bg-makuva-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-makuva-700 bg-makuva-800">
          {user ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-makuva-100">{user.name}</div>
                <div className="text-sm font-medium text-makuva-300">{user.email}</div>
              </div>
            </div>
          ) : (
            <div className="px-5">
              <Button asChild className="w-full bg-ember-500 hover:bg-ember-600 text-white">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default MainNav


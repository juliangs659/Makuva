import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import MainNav from "@/components/main-nav"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "TripPlanner - Rutas turísticas personalizadas",
  description: "Crea itinerarios turísticos personalizados con puntos de interés",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans">
        <AuthProvider>
          <MainNav />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'
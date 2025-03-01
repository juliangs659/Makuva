import { Mountain } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Mountain className="w-8 h-8 text-ember-500 mr-2" />
      <span className="text-2xl font-bold text-makuva-100">Makuva</span>
    </div>
  )
}


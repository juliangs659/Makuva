"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AdvancedSearch() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState([1, 30])
  const [budget, setBudget] = useState("medium")
  const [activities, setActivities] = useState<string[]>([])
  const [accessibility, setAccessibility] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí podrías construir la URL de búsqueda con todos los parámetros
    const searchParams = new URLSearchParams({
      destination,
      minDuration: duration[0].toString(),
      maxDuration: duration[1].toString(),
      budget,
      activities: activities.join(","),
      accessibility: accessibility.toString(),
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6 p-6 bg-white dark:bg-makuva-800 rounded-lg shadow-lg">
      <div>
        <Label htmlFor="destination">Destino</Label>
        <Input
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="¿A dónde quieres ir?"
        />
      </div>

      <div>
        <Label>Duración (días)</Label>
        <Slider min={1} max={30} step={1} value={duration} onValueChange={setDuration} />
        <div className="flex justify-between text-sm text-makuva-500 mt-2">
          <span>{duration[0]} día(s)</span>
          <span>{duration[1]} día(s)</span>
        </div>
      </div>

      <div>
        <Label htmlFor="budget">Presupuesto</Label>
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger id="budget">
            <SelectValue placeholder="Selecciona un presupuesto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Económico</SelectItem>
            <SelectItem value="medium">Medio</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Actividades</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Playa", "Montaña", "Ciudad", "Cultural"].map((activity) => (
            <Button
              key={activity}
              type="button"
              variant={activities.includes(activity) ? "default" : "outline"}
              onClick={() =>
                setActivities(
                  activities.includes(activity) ? activities.filter((a) => a !== activity) : [...activities, activity],
                )
              }
            >
              {activity}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="accessibility" checked={accessibility} onCheckedChange={setAccessibility} />
        <Label htmlFor="accessibility">Accesibilidad requerida</Label>
      </div>

      <Button type="submit" className="w-full bg-gradient-makuva hover:opacity-90 transition-opacity text-white">
        Buscar aventuras
      </Button>
    </form>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-slate-300 select-none">404</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800">Página no encontrada</h2>
          <p className="text-slate-600 leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o ha sido movida. Verifica la URL o regresa al inicio.
          </p>
        </div>

        {/* Search Icon Illustration */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-xl font-bold">×</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Button>
          </Link>

          <Button variant="outline" className="w-full" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atrás
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            ¿Necesitas ayuda?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

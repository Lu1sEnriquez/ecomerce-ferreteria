"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProductoPage() {
  const router = useRouter()

  useEffect(() => {
    router.back()
  }, [router])

  return null
}

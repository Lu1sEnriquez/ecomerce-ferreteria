"use server"

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

interface QueryOptions {
  method?: string
  body?: unknown
  customerId?: string // documentId del usuario
  customerEmail?: string // correo del usuario
}

export async function query<T>(
  url: string,
  options: QueryOptions = {}, // Opciones para el CRUD
): Promise<T> {
  const { method = "GET", body, customerId, customerEmail } = options // Si no se manda método, por defecto es GET

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    }

    // Añadir headers de cliente si están disponibles
    if (customerId) {
      headers["x-customer-id"] = customerId
    }

    if (customerEmail) {
      headers["x-customer-email"] = customerEmail
    }

    const response = await fetch(`${STRAPI_HOST}/api/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined, // Solo se incluye el cuerpo si existe
    })

    // if (!response.ok) {
    //   throw new Error(`Error en la solicitud: ${response.statusText}`)
    // }

    return await response.json()
  } catch (error) {
    console.error("Error al realizar la solicitud:", error)
    throw error
  }
}

import { User, UserToken } from "@/interfaces/auth/user.interface";
import { BACKEND_ROUTES } from "../../contants/backend-routes/routes";
import { RegisterPartialData } from "@/modules/common/components/auth/register/register-schema";

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
// const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

// export async function registerUser(
//   data: RegisterPartialData
// ): Promise<UserToken> {
//   try {
//     const response = await fetch(`${STRAPI_HOST}/api/${BACKEND_ROUTES.REGISTER}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       console.error("Respuesta del servidor:", result);
//       throw new Error(
//         result?.error?.message || result?.message || "Bad Request"
//       );
//     }

//     return result;
//   } catch (error: any) {
//     console.error("Error al realizar la solicitud:", error);
//     throw new Error("Error en la solicitud: " + error.message);
//   }
// }

export async function registerUser(
  data: RegisterPartialData
): Promise<User> {
  try {
    const response = await fetch(`${STRAPI_HOST}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", result);
      throw new Error(
        result?.error?.message || result?.message || "Bad Request"
      );
    }

    return result.data as User;
  } catch (error: unknown) {
    console.error("Error al realizar la solicitud:", error);
    if (error instanceof Error) {
      throw new Error("Error en la solicitud: " + error.message);
    } else {
      throw new Error("Error en la solicitud: " + String(error));
    }
  }
}

export async function loginUser(data: RegisterPartialData): Promise<UserToken> {
  try {
    const response = await fetch(`${STRAPI_HOST}/api/${BACKEND_ROUTES.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined, // Solo se incluye el cuerpo si existe
    });

    if (!response.ok) {
      console.log(await response.json());

      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error al realizar la solicitud:", error);
    if (error instanceof Error) {
      throw new Error("Error en la solicitud: " + error.message);
    } else {
      throw new Error("Error en la solicitud: " + String(error));
    }
  }
}

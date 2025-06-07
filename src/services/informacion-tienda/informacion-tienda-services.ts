import { BACKEND_ROUTES } from "@/contants/backend-routes/routes";
import { DataResponse } from "@/interfaces/data/response.interface";
import { InfoEcommerce } from "@/interfaces/informacion-tienda/informacion-tienda.interface";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT: string = BACKEND_ROUTES.INFORMATION_ECOMMERCE;
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;

export function getInfoEcommerce(): Promise<DataResponse<InfoEcommerce>> {
  const params = new URLSearchParams();

  params.set("populate[logo][fields][0]", "url");
  params.set("populate[direcciones][populate][imagenes][fields][0]", "url");
  params.set("populate[redesSociales][populate][icono][fields][0]", "url");
  params.set("populate[nosotros][populate][imagenHistoria][fields][0]", "url");
  params.set(
    "populate[nosotros][populate][personal][populate][img][fields][0]",
    "url"
  );

  const url = `${BASE_ENDPOINT}?${params.toString()}`;
  return query<DataResponse<InfoEcommerce>>(url)
    .then((res) => {
      const dataMap: InfoEcommerce = {
        ...res.data,
        logo: { ...res.data.logo, url: `${STRAPI_HOST}${res.data?.logo?.url}` },
        redesSociales: res.data.redesSociales?.map((red) => ({
          ...red,
          icono: { ...red.icono, url: `${STRAPI_HOST}${red.icono.url}` },
        })),
        nosotros: {
          ...res.data.nosotros,
          imagenHistoria: res.data?.nosotros?.imagenHistoria
            ? {
                ...res.data.nosotros.imagenHistoria,
                id: res.data.nosotros.imagenHistoria.id ?? 0,
                url: `${STRAPI_HOST}${res.data.nosotros.imagenHistoria.url}`,
              }
            : undefined,
          personal: res.data.nosotros?.personal?.map((persona) => ({
            ...persona,
            img: { ...persona.img, url: `${STRAPI_HOST}${persona.img.url}` },
          })),
        },
        direcciones: res.data?.direcciones?.map((d) => ({
          ...d,
          imagenes: d.imagenes.map((img) => ({
            ...img,
            url: `${STRAPI_HOST}${img.url}`,
          })),
        })),
      };
      return { ...res, data: dataMap };
    })
    .catch((error) => {
      console.error(
        "Something terrible happened when getting stock actions: ",
        error
      );
      throw error;
    });
}

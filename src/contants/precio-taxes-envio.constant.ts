// costos de envio y taxes


;
export const PORCENTAJE_IMPUESTOS = Number(process.env.NEXT_PUBLIC_PORCENTAJE_IMPUESTOS) || 16;


export const CANTIDAD_MIN_ENVIO_GRATIS = Number(process.env.NEXT_PUBLIC_CANTIDAD_MIN_ENVIO_GRATIS) || 400;


export const COSTO_ENVIO = Number(process.env.NEXT_PUBLIC_COSTO_ENVIO) || 300;
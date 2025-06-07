import { BACKEND_ROUTES } from "@/contants/backend-routes/routes";
import { User } from "@/interfaces/auth/user.interface";
import { DataResponse } from "@/interfaces/data/response.interface";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT = BACKEND_ROUTES.USERS;

export function getUser(): Promise<User> {
  return query<User>(`${BASE_ENDPOINT}?populate=*`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(
        "Something terrible happened whe getting the users:",
        error
      );
      throw error;
    });
}

export function getMeInfo( id: string | undefined ): Promise<DataResponse<User>> {
  const q = `${BASE_ENDPOINT}/${id}?populate=*`;
  return query<DataResponse<User>>(q)
    .then((res: DataResponse<User>) => {
      return res;
    })
    .catch((error: unknown) => {
      console.error(
        "Something terrible happened whe getting the users:",
        error
      );
      throw error;
    });
}

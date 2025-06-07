"use client";
import { BasketGrid } from "@/modules/cart/basket";
import { Button } from "@/components/ui/button";
import { ModalAuth } from "@/modules/common/components/auth/modalAuth";
import { getUserDirections } from "@/services/directions/directions-services";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useInfoEcommerceStore } from "@/store/info-ecommerce.store";
import { useEffect, useState } from "react";
import { DataResponse } from "@/interfaces/data/response.interface";
import { Address } from "@/interfaces/directions/directions.interface";

export default function CartPage() {

  const { data: session } = useSession();
  const { infoEcommerce } = useInfoEcommerceStore();

  const [address, setAddress] = useState<DataResponse<Address[]> | null>(null);

  
  useEffect(() => {
    const fetchAddresses = async () => {
      if (session?.user?.user.documentId) {
        const res = await getUserDirections(session.user.user.documentId);
        setAddress(res);
      }
    };
    fetchAddresses();
  }, [session?.user?.user.documentId]);


  if (!session?.user?.user.documentId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <h1 className="text-4xl font-bold mb-6">{`Bienvenido a ${infoEcommerce?.nombre}`}</h1>
          <p className="text-xl mb-8 max-w-md">
            Descubre asombrosos productos a excelentes precios. Comienza a
            comprar ahora!
          </p>
          <div className="flex gap-4">
            <ModalAuth />
            <Button variant="outline" size="lg">
              <Link href="/">Buscar Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }


  if (!address) {
    return <div>Cargando direcciones...</div>;
  }
  return <BasketGrid session={session} addresses={address.data} />;
}

// app/(user)/marca/page.tsx
"use client";

import MarcasGrid from "@/modules/common/components/marcas-grid/marcas-grid";
import { TitleGradient } from "@/modules/common/components/titles/title-gradient";
import { Tags } from "lucide-react";
import { getMarcas } from "@/services/marcas/marcas-services";
import { useEffect, useState } from "react";
import { Marca } from "@/interfaces/marcas/marca.interface";

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const { data } = await getMarcas();
        setMarcas(data);
      } catch (error) {
        console.error("Error al obtener marcas:", error);
      }
    }

    fetchMarcas();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        <TitleGradient
          title="Categorías"
          subtitle="Explora nuestras categorías"
          tagIcon={<Tags size={40} />}
        />
        <MarcasGrid marcas={marcas} />
      </div>
    </main>
  );
}

import { Card } from "@/components/ui/card";
import CategoryCarousel from "@/modules/common/components/category-carousel/category-carousel";
import { ErrorState } from "@/modules/common/components/error/ErrorState";
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { ResponsiveStoreFilters } from "@/modules/shop/ResponsiveStoreFilters"; // Asegúrate que esta ruta esté bien
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import {
  getProductsByFilters,
  ProductFilters,
} from "@/services/products/products-services";
import { AlertTriangle } from "lucide-react";

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  try {
    const slug = decodeURIComponent((await params).slug);
    const searhParamsResust = await searchParams;
    const { data: categorias } = await getCategorias();
    const categoria = categorias.find((cat) => cat.nombre === slug);

    const filtros: ProductFilters = {
      categorias: [
        slug,
        // ...(categoria?.subcategorias?.map((s) => s.nombre) || []),
        ...(searhParamsResust?.categorias?.split(",") || []),
      ].filter(Boolean),
      marcas: searhParamsResust?.marca?.split(","),
      precioMin: searhParamsResust?.precioMin
        ? Number(searhParamsResust?.precioMin)
        : undefined,
      precioMax: searhParamsResust?.precioMax
        ? Number(searhParamsResust?.precioMax)
        : undefined,
    };

    const productResult = await getProductsByFilters(filtros);
    console.log(productResult);

    const { data: marcas } = await getMarcas();

    return (
      <main className="container mx-auto px-4 py-8">
        {/* Mobile: Filters on top */}
        <div className="md:hidden mb-4">
          <ResponsiveStoreFilters
            categorias={categorias}
            marcas={marcas}
            categoriaBase={slug}
            selectedFilters={filtros}
          />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Desktop: Filters on the side */}
          <div className="hidden md:block">
            <ResponsiveStoreFilters
              categorias={categorias}
              marcas={marcas}
              categoriaBase={slug}
              selectedFilters={filtros}
            />
          </div>
          {/* Main content */}
          <div className="md:col-span-3 space-y-4">
            <Card>
              {categoria?.subcategorias && (
                <CategoryCarousel
                  className="w-full"
                  categorias={categoria?.subcategorias}
                />
              )}
            </Card>
            <ProductGrid products={productResult} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error en la página de marca:", error);
    return (
      <main className="container mx-auto px-4 py-8">
        <ErrorState
          icon={<AlertTriangle size={48} />}
          title="Error al cargar la categoria"
          message="No pudimos obtener los datos de esta categoria. Por favor, intenta de nuevo más tarde."
        />
      </main>
    );
  }
}

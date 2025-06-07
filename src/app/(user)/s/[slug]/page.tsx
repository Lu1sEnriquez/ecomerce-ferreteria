import {
  parseProductFilters,
  searchProductsWithParams,
} from "@/services/products/products-services";
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { StoreFilters } from "@/modules/shop/StoreFilters";
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import { ErrorState } from "@/modules/common/components/error/ErrorState";
import { AlertTriangle } from "lucide-react";

export default async function SearchSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  try {
    const { slug } = await params;
    const searchDecode = decodeURIComponent(slug);
    const searhParamsResust = await searchParams;
    const filtered = parseProductFilters(searhParamsResust);
    console.log(searhParamsResust);
    console.log("filtered", filtered);

    const productData = await searchProductsWithParams(filtered);
    console.log("productos", productData);
    const { data: categorias } = await getCategorias();
    const { data: marcas } = await getMarcas();

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StoreFilters categorias={categorias} marcas={marcas} />
          <div className="col-span-3 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Resultados para:{" "}
              <span className="text-primary">{searchDecode}</span>
            </h2>

            {productData.data.length > 0 ? (
              <ProductGrid products={productData} />
            ) : (
              <p>No se encontraron productos para esta búsqueda.</p>
            )}
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
          title="Error al cargar los productos relacionados ala busqueda"
          message="No pudimos obtener los productos relacionados ala busqueda. Por favor, intenta de nuevo más tarde."
        />
      </main>
    );
  }
}


import { TitleGradient } from "@/modules/common/components/titles/title-gradient";
import { ProductosFavoritos } from "@/modules/profile/favorites-products";
import { Heart } from "lucide-react";

export default function FavoritosPage() {
  return (
    <main className="container mx-auto">
      <TitleGradient title="Favoritos" tagIcon={<Heart size={50} />} />
      <ProductosFavoritos />
    </main>
  );
}

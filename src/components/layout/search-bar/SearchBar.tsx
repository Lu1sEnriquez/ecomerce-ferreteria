"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CartDropdown from "../../../modules/cart/cart-dropdown/cart-dropdown";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();

      // Si no hay texto de búsqueda y no hay parámetro "search" existente, no hacer nada
      const currentSearchParam = searchParams.get("search");
      const shouldCleanSearch = currentSearchParam && trimmedQuery.length === 0;
      const shouldUpdateSearch = trimmedQuery.length > 0 && currentSearchParam !== trimmedQuery;

      if (!shouldUpdateSearch && !shouldCleanSearch) return;

      const params = new URLSearchParams(searchParams.toString());

      if (trimmedQuery.length > 0) {
        params.set("search", trimmedQuery);
        params.set("page", "1");
        params.set("pageSize", "10");
      } else {
        params.delete("search");
        params.set("page", "1");
      }

      router.push(`${window.location.pathname}?${params.toString()}`);
    }, 1500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, router, searchParams]); // depende de searchQuery, router y searchParams

  return (
    <div className="ml-auto flex items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center gap-2 mr-4 w-[200px] lg:w-[300px]"
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </form>

      <CartDropdown />
    </div>
  );
};

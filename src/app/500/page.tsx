import { ErrorState } from "@/modules/common/components/error/ErrorState";
import { AlertTriangle } from "lucide-react";

// app/500/page.tsx
export default function Error500() {
  return (
   <main className="container mx-auto px-4 py-8">
        <ErrorState
          icon={<AlertTriangle size={48} />}
          title="Error  500"
          message="Lo sentimos, Por favor intenta de nuevo más tarde."
        />
      </main>
  );
}

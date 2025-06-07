import { auth } from "@/auth";
import { ErrorState } from "@/modules/common/components/error/ErrorState";
import { OrdersClient } from "@/modules/orders/orders-client"
import { getUserOrders } from "@/services/orders/orders-services";
import { AlertTriangle } from "lucide-react";

export default async function PedidosPage() {
  try{
  const session = await auth();
  const orders = await getUserOrders( session?.user?.user.id )

  return <OrdersClient initialPedidos={orders.data} />
  } catch (error) {
    console.error("Error en la página de marca:", error);
    return (
      <main className="container mx-auto px-4 py-8">
        <ErrorState
          icon={<AlertTriangle size={48} />}
          title="Error al cargar los pedidos"
          message="No pudimos obtener la informacion de tus pedidos. Por favor, intenta de nuevo más tarde."
        />
      </main>
    );
  }
}
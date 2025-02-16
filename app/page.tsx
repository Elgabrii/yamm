import OrdersTable from "@/components/orders-table";
import { fetchAllOrders } from "@/app/actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
  const orders = await fetchAllOrders();

  return (
    <main className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Refund Orders Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <OrdersTable initialOrders={orders} />
      </Suspense>
    </main>
  );
}

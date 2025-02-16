import OrderDetails from "@/components/order-details";
import { fetchOrderById } from "@/app/actions";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await fetchOrderById(params.id);

  return (
    <div className="container mx-auto p-4">
      <OrderDetails order={order} />
    </div>
  );
}

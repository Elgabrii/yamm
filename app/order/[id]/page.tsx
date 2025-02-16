import OrderDetails from "@/components/order-details";
import { fetchOrderById } from "@/app/actions";

export default async function OrderPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const order = await fetchOrderById(params.id);

  return (
    <div className="container mx-auto p-4">
      <OrderDetails order={order} />
    </div>
  );
}

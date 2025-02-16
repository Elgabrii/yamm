import OrderDetails from "@/components/order-details";
import { fetchOrderById } from "@/app/actions";

export default async function OrderPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const { data: order, error } = await fetchOrderById(params.id);

  if (error) {
    return <div className="p-4 w-screen h-screen flex flex-col items-center justify-center">
      <p>An error occurred while fetching order: {error}</p>
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      {order && <OrderDetails order={order} />}
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Order } from "@/data/orders";

export default function OrderDetails({ order }: { order: Order }) {
  return (
      <Card>
        <CardHeader>
          <CardTitle>{order.store_name} - Order Details</CardTitle>
          <CardDescription>Order ID: {order.Id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Reason:</strong> {order.reason}
              </p>
              <p>
                <strong>Store URL:</strong>{" "}
                <a
                  href={order.store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {order.store_url}
                </a>
              </p>
              <p>
                <strong>Amount:</strong> ${order.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p>
                <strong>Status:</strong> {order.active ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Decision:</strong> {order.decision ?? "Pending"}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Items</h3>
            <ul className="space-y-2">
              {order.Items.map((item) => (
                <li key={item.id} className="flex justify-between border-b pb-2">
                  <span>{item.name}</span>
                  <span>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
  );
}

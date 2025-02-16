
import { NextResponse } from "next/server";
import { defaultOrders } from "@/data/orders";

export async function GET(request: Request, props: { params: Promise<{ orderId: string }> }) {
  const params = await props.params;
  const { orderId } = params;
  const order = defaultOrders.find((o) => o.Id === orderId);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}

import { NextResponse } from "next/server";
import { defaultOrders } from "@/data/orders";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
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
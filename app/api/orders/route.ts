import { NextResponse } from "next/server";
import { defaultOrders } from "@/data/orders";

export async function GET(): Promise<NextResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(defaultOrders));
    }, 300);
  });
}

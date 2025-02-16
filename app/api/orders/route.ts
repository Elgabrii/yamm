import { NextResponse } from "next/server";
import { defaultOrders } from "@/data/orders";

export async function GET() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(defaultOrders));
    }, 1000);
  });
}

"use server";

import { Order } from "@/data/orders";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function fetchAllOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    cache: "no-cache",
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  
  return res.json();
}

export async function fetchOrderById(orderId: string): Promise<Order> {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    cache: "no-cache",
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch order with id ${orderId}`);
  }
  
  return res.json();
}

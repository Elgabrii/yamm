"use server";

import { FetchOrderByIdResponse, FetchOrdersResponse } from "@/data/orders";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function fetchAllOrders(): Promise<FetchOrdersResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/orders`);
    
    if (!res.ok) {
      const error = await res.text();
      return { data: null, error };
    }
    const orders = await res.json();
    return { data: orders, error: null };
  } catch (error) {
    console.error("Error fetching orders:", error);
    let errorMessage = "An error occurred while fetching orders.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { data: null, error: errorMessage };
  }
}
export async function fetchOrderById(orderId: string): Promise<FetchOrderByIdResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
    
    if (!res.ok) {
      const error = await res.text();
      return { data: null, error };
    }
    const order = await res.json();
    return { data: order, error: null };
  } catch (error) {
    console.error("Error fetching order:", error);
    let errorMessage = "An error occurred while fetching order.";
    if (error instanceof Error) {
      errorMessage = error?.message;
    }
    return { data: null, error: errorMessage };
  }
}

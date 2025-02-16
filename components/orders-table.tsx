"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/app-table"; // Adjust the path if needed
import { Badge } from "@/components/ui/badge";
import { Order } from "@/data/orders";
import OrderActions from "@/components/order-actions";

interface OrdersTableProps {
  initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const toggleActive = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.Id === orderId ? { ...order, active: !order.active } : order
      )
    );
  };

  const changeDecision = ({
    decision,
    orderId,
  }: {
    decision: "Accept" | "Reject" | "Escalate";
    orderId: string;
  }) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.Id === orderId ? { ...order, decision } : order
      )
    );
  };

  // Define the columns for the orders table
  const columns: Column<Order>[] = [
    {
      header: "Order ID",
      accessor: "Id",
    },
    {
      header: "Reason",
      accessor: "reason",
    },
    {
      header: "Store",
      accessor: (row) => (
        <a
          href={row.store_url}
          className="text-blue-500 hover:underline"
          rel="noopener noreferrer"
        >
          {row.store_name}
        </a>
      ),
    },
    {
      header: "Decision",
      accessor: (row) => row.decision ?? "Not yet",
    },
    {
      header: "Amount",
      accessor: (row) => `$${row.amount.toFixed(2)}`,
    },
    {
      header: "Active",
      accessor: (row) => (
        <Badge
          variant={row.active ? "default" : "destructive"}
          className="text-xs"
        >
          {row.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <OrderActions
          order={row}
          onToggleActive={toggleActive}
          onChangeDecision={changeDecision}
        />
      ),
    },
  ];

  return (
    <main className="w-full">
      <DataTable<Order> data={orders} columns={columns} recordsPerPage={10} />
    </main>
  );
}

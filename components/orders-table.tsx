"use client";

import { useState } from "react";
import DataTable, { Column } from "@/components/app-table"; // Adjust the path if needed
import { Badge } from "@/components/ui/badge";
import { Order } from "@/data/orders";
import { useToast } from "@/hooks/use-toast"

import OrderActions from "@/components/order-actions";

interface OrdersTableProps {
  initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { toast } = useToast();
  
  const toggleActive = (orderId: string, active?: boolean) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.Id === orderId ? { ...order, active: !order.active } : order
      )
    );
    toast({
      title: `Order ${orderId} has been ${!active ? "activated" : "deactivated"}`,
      description: "Order has been updated",
      duration: 5000,
    });
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
    toast({
      title: `Order ${orderId} has been ${decision}`,
      description: "Order has been updated",
      duration: 5000,
    });
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
      header: "Items",
      accessor: (row) => row.Items.length,
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
      <DataTable<Order> data={orders} columns={columns} recordsPerPage={15} />
    </main>
  );
}

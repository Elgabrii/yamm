"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialOrders = [
  {
    Id: "ORD001",
    reason: "Return",
    store_name: "Acme Store",
    store_url: "https://acme.com",
    amount: 250,
    active: true,
    decision: null,
    Items: [{ name: "Widget", id: "WIDGET1", price: 50, quantity: 5 }],
  },
  {
    Id: "ORD002",
    reason: "Refund",
    store_name: "Best Goods",
    store_url: "https://bestgoods.com",
    amount: 150,
    active: false,
    decision: null,
    Items: [{ name: "Gadget", id: "GADGET1", price: 75, quantity: 2 }],
  },
  {
    Id: "ORD003",
    reason: "Exchange",
    store_name: "ShopRight",
    store_url: "https://shopright.com",
    amount: 350,
    active: true,
    decision: null,
    Items: [{ name: "Item X", id: "ITEMX1", price: 175, quantity: 2 }],
  },
  {
    Id: "ORD004",
    reason: "Return",
    store_name: "Acme Store",
    store_url: "https://acme.com",
    amount: 450,
    active: true,
    decision: null,
    Items: [{ name: "Widget", id: "WIDGET2", price: 225, quantity: 2 }],
  },
  {
    Id: "ORD005",
    reason: "Refund",
    store_name: "Best Goods",
    store_url: "https://bestgoods.com",
    amount: 550,
    active: false,
    decision: null,
    Items: [{ name: "Gadget", id: "GADGET2", price: 275, quantity: 2 }],
  },
  {
    Id: "ORD006",
    reason: "Exchange",
    store_name: "ShopRight",
    store_url: "https://shopright.com",
    amount: 200,
    active: false,
    decision: null,
    Items: [{ name: "Item Y", id: "ITEMY1", price: 100, quantity: 2 }],
  },
  {
    Id: "ORD007",
    reason: "Return",
    store_name: "Acme Store",
    store_url: "https://acme.com",
    amount: 300,
    active: true,
    decision: null,
    Items: [{ name: "Widget", id: "WIDGET3", price: 150, quantity: 2 }],
  },
]

export default function AppTable() {
  const [orderData, setOrderData] = useState(initialOrders)

  const toggleActive = (orderId: string) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.Id === orderId ? { ...order, active: !order.active } : order
      )
    )
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((order) => (
          <TableRow key={order.Id}>
            <TableCell className="font-medium">{order.Id}</TableCell>
            <TableCell>{order.reason}</TableCell>
            <TableCell>
              <a href={order.store_url} className="text-blue-500 hover:underline">
                {order.store_name}
              </a>
            </TableCell>
            <TableCell>{`$${order.amount.toFixed(2)}`}</TableCell>
            <TableCell>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={order.active}
                  onChange={() => toggleActive(order.Id)}
                />
                <span>{order.active ? "Active" : "Inactive"}</span>
              </label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell>
            {`$${orderData
              .filter((order) => order.active)
              .reduce((acc, order) => acc + order.amount, 0)
              .toFixed(2)}`}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
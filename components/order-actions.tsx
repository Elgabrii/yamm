"use client";

import Link from "next/link";
import { ReceiptText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Order } from "@/data/orders";

interface OrderActionsProps {
  order: Order;
  onToggleActive: (orderId: string, active?: boolean) => void;
  onChangeDecision: (args: {
    decision: "Accept" | "Reject" | "Escalate";
    orderId: string;
  }) => void;
}

export default function OrderActions({
  order,
  onToggleActive,
  onChangeDecision,
}: OrderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Decision</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Decision</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={order.decision === "Reject"}
            onCheckedChange={() =>
              onChangeDecision({ decision: "Reject", orderId: order.Id })
            }
          >
            Reject
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={order.decision === "Accept"}
            onCheckedChange={() =>
              onChangeDecision({ decision: "Accept", orderId: order.Id })
            }
          >
            Accept
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={order.decision === "Escalate"}
            onCheckedChange={() =>
              onChangeDecision({ decision: "Escalate", orderId: order.Id })
            }
          >
            Escalate
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      |
      <Switch
        checked={order.active}
        onClick={() => onToggleActive(order.Id, order.active)}
        type="button"
      />
      |
      <Link href={`/order/${order.Id}`}>
        <ReceiptText className="text-xs" />
      </Link>
    </div>
  );
}

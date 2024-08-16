import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";

const OrderItemCard = ({ order }) => {
  const { updateRestaurantOrderStatus, isPending } =
    useUpdateMyRestaurantOrder();

  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus) => {
    await updateRestaurantOrderStatus({
      orderId: order._id,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hour = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hour}:${paddedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            <span className="text-lg font-bold">Customer Name:</span>
            <span className="ml-2 text-lg font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            <span className="text-lg font-bold">Delivery address:</span>
            <span className="ml-2 text-lg font-normal">
              {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
            </span>
          </div>
          <div>
            <span className="text-lg font-bold">Time:</span>
            <span className="ml-2 text-lg font-normal">{getTime()}</span>
          </div>
          <div>
            <span className="text-lg font-bold">Total Cost:</span>
            <span className="ml-2 text-lg font-normal">
              ₹{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of the order?</Label>
          <Select
            value={status}
            disabled={isPending}
            onValueChange={(value) => handleStatusChange(value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;

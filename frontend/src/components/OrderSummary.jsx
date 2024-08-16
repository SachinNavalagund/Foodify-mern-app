import React from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

const OrderSummary = ({ restaurantById, cartItems, removeFromCart }) => {
  const getTotalCoat = () => {
    const totalInPaise = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPaise + restaurantById.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCoat()}</span>
        </CardTitle>

        <CardContent className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div className="flex mt-5 justify-between">
              <span>
                <Badge className="mr-2">{item.quantity}</Badge>
                {item.name}
              </span>
              <span className="flex items-center gap-1">
                <Trash
                  className="cursor-pointer"
                  color="red"
                  size={20}
                  onClick={() => removeFromCart(item)}
                />
                ₹{((item.price * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex   gap-5 justify-between">
            <span>Delivery </span>
            <span> ₹{(restaurantById.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator />
        </CardContent>
      </CardHeader>
    </>
  );
};

export default OrderSummary;

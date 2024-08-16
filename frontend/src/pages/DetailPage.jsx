import { useGetRestaurantById } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantById, isPending } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState([]);

  //ADD TO CART
  const addToCart = (menuItem) => {
    setCartItems((prevCartItem) => {
      //check item is present in cart
      const existingCartItem = prevCartItem.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      //if exist add +1 quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItem.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        //if not exist add new item to cart
        updatedCartItems = [
          ...prevCartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      return updatedCartItems;
    });
  };

  //REMOVE FROM CART
  const removeFromCart = (cartItem) => {
    setCartItems((prevCartIrems) => {
      const updatedCartItems = prevCartIrems.filter(
        (item) => cartItem._id !== item._id
      );
      return updatedCartItems;
    });
  };

  if (isPending || !restaurantById) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantById.imageUrl}
          alt="Restaurant image"
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid lg:grid-cols-[3.5fr_2fr] gap-5 lg:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurantById={restaurantById} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantById.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurantById={restaurantById}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

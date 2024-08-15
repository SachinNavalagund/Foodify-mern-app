import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/mange-restaurant-form/ManageRestaurantForm";
import React from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isPending={isPending} />
  );
};

export default ManageRestaurantPage;

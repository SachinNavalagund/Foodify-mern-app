import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/mange-restaurant-form/ManageRestaurantForm";
import React from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();

  const { myRestaurant } = useGetMyRestaurant();

  const { updateRestaurant, isPending: isUpdatePending } =
    useUpdateMyRestaurant();

  const isEditing = !!myRestaurant;
  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isPending={isPending || isUpdatePending}
      myRestaurant={myRestaurant}
    />
  );
};

export default ManageRestaurantPage;

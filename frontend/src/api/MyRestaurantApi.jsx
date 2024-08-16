import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    data: myRestaurant,
    isPending,
    error,
  } = useQuery({
    queryKey: ["myRestaurant"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/get-my-restaurent`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      return response.json();
    },
  });
  if (error) {
    toast.error(error.toString());
  }

  return { myRestaurant, isPending, error };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: createRestaurant, isPending } = useMutation({
    mutationFn: async (restaurantFormData) => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/create-restaurent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: restaurantFormData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);
        toast.error(errorData.message);
        throw new Error("Failed to create restaurant");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Restaurant created successfully 🎉");
    },
  });

  return { createRestaurant, isPending };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: updateRestaurant, isPending } = useMutation({
    mutationFn: async (restaurantFormData) => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/update-restaurent`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: restaurantFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update restaurant");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Restaurant updated successfully 🎉");
    },
    onError: () => {
      toast.error("Unable to update restaurant");
    },
  });

  return { updateRestaurant, isPending };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ["getOrders"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      const resposne = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!resposne.ok) {
        throw new Error("Failed to fetch orders");
      }

      return resposne.json();
    },
  });
  if (error) {
    toast.error(error.toString());
  }

  return { orders, isPending, error };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: updateRestaurantOrderStatus,
    isPending,
    reset,
  } = useMutation({
    mutationFn: async (updateStatusOrderRequest) => {
      const accessToken = await getAccessTokenSilently();
      console.log("order id ->", updateStatusOrderRequest.orderId);

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updateStatusOrderRequest.status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Order updated 🎉");
    },
    onError: () => {
      toast.error("Unable to update order");
      reset();
    },
  });
  return { updateRestaurantOrderStatus, isPending };
};

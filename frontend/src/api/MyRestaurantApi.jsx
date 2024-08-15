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
        // const errorText = await response.text();
        // const errorData = JSON.parse(errorText);
        // toast.error(errorData.message);
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

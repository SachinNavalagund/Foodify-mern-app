import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      console.log(response);

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

import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantById = (restaurantId) => {
  const { data: restaurantById, isPending } = useQuery({
    queryKey: ["getRestaurantById"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}`
      );

      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    },
    enabled: !!restaurantId,
  });

  return { restaurantById, isPending };
};

export const useSearchRestaurants = (searchState, city) => {
  const { data: results, isPending } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);

      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    },
    enabled: !!city,
  });

  return { results, isPending };
};

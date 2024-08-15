import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city) => {
  const { data: results, isPending } = useQuery({
    queryKey: ["searchRestaurants"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}`
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

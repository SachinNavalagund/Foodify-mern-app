import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ auth0Id, email }) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user/create-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth0Id, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    },
  });

  return { createUser, isPending, isError, isSuccess };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: async (formData) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user/update-user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to upadte user");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("User profile updated! 🎉");
    },
    onError: () => {
      toast.error(error.message || "Sothing went wrong");
      reset();
    },
  });
  return { updateUser, isPending, isError, isSuccess, error, reset };
};

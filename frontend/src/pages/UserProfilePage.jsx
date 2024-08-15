import { useGetLoggedInUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import React from "react";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUser();
  const { currentUser, isPending: isLoading } = useGetLoggedInUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isPending={isPending}
      />
    </>
  );
};

export default UserProfilePage;

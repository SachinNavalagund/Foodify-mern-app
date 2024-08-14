import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import React from "react";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUser();
  return (
    <>
      <UserProfileForm onSave={updateUser} isPending={isPending} />
    </>
  );
};

export default UserProfilePage;

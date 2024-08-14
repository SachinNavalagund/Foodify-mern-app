import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { user, logout } = useAuth0();
  return (
    <>
      <p className="text-orange-500 text-lg font-bold">
        {user?.name.toLocaleUpperCase()}
      </p>
      <div className="flex w-full flex-col gap-4 my-4 ">
        <Link
          to="user-profile"
          className="flex bg-white items-center font-bold hover:text-orange-500 text-base">
          User Profile
        </Link>
        <Button
          className="hover:border-2 w-full hover:border-orange-500 hover:text-orange-500 hover:bg-white  font-bold bg-orange-500 text-white transition ease-in  duration-200 "
          onClick={() => logout()}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default MobileNavLinks;

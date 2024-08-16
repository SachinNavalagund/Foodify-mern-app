import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UserNameMenu />
      ) : (
        <Button
          onClick={handleLogin}
          variant="outline"
          className="border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition ease-in  duration-200 ">
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;

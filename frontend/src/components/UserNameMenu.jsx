import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <User2 className="text-orange-500" />
        {user?.name.toLocaleUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center justify-center">
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-orange-500 text-center my-1">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-center">
          <Link
            to="/user-profile"
            className="font-bold hover:text-orange-500 text-center my-1">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-orange-500 hover:bg-white hover:text-orange-500 transition ease-in duration-200 hover:border hover:border-orange-500 my-1"
            onClick={() => logout()}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;

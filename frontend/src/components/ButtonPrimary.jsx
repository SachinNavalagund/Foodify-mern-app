import React from "react";
import { Button } from "./ui/button";

const ButtonPrimary = ({ children }) => {
  return (
    <Button
      varaint="ghost"
      className="font-bold bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-600 transition ease-in  duration-200 ">
      {children}
    </Button>
  );
};

export default ButtonPrimary;

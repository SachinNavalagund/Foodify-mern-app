import React from "react";
import { Button } from "./ui/button";

const ButtonSecondary = ({ children }) => {
  return (
    <Button
      variant="outline"
      className="border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition ease-in  duration-200 ">
      {children}
    </Button>
  );
};

export default ButtonSecondary;

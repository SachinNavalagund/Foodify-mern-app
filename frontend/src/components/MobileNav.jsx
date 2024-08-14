import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 text-center">
        <SheetTitle>
          Welcome to <span className="text-orange-500 font-bold">Foodify</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="felx">
          <Button className="flex w-full font-bold bg-orange-500 hover:bg-orange-400 transition ease-in delay-75 duration-200 hover:scale-105">
            Login
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

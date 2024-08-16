import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = () => {
  return (
    <Button disabled className="flex-1">
      <Loader2 className="size-4 mr-2 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

const RestaurantInfo = ({ restaurantById }) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurantById.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurantById.city}, {restaurantById.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap">
        {restaurantById.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurantById.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;

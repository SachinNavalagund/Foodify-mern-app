import React from "react";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        alt="Hero image"
        className="w-full object-cover max-h-[600px]"
      />
    </div>
  );
};

export default Hero;

import React from "react";

const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl font-bold text-white tracking-tighter">
          Foodify
        </span>
        <span className="text-white font-bold tracking-tighter flex gap-4">
          <span>Provicy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;

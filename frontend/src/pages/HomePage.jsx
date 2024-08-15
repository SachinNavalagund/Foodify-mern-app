import React from "react";
import landingImage from "../assets/landing.png";
import appImage from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSerachSubmit = (searchFormValues) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 text-center md:px-32 bg-white rounded-lg shadow-md py-8 -mt-16">
        <h1 className="text-5xl font-bold tracking-tighter text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl ">Food is just a click away!</span>
        <SearchBar
          placeholder={"Search by city or Town"}
          onSubmit={handleSerachSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Orde takeway even faster
          </span>
          <span>
            Download the Foodify App for faster ordering and personalised
            recommendations
          </span>
          <img src={appImage} alt="Download mobile app image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

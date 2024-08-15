import { v2 as cloudinary } from "cloudinary";
import Restaurant from "../models/restaurantModel.js";
import mongoose from "mongoose";

export const createMyRestaurant = async (req, res) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    //getting image with the help of multer
    const image = req.file;
    //converting image buffer to base64 iamge string
    const base64Image = Buffer.from(image.buffer).toString("base64");
    //adding image format and also the base64 image so we can pass dataURi to cloudinary (explaines something about image type of image)
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    //uploading image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);

    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log("Error in createMyRestaurant controller :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

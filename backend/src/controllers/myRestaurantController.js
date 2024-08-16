import { v2 as cloudinary } from "cloudinary";
import Restaurant from "../models/restaurantModel.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";

export const createMyRestaurant = async (req, res) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file);

    const restaurant = new Restaurant(req.body);

    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log("Error in createMyRestaurant controller :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error in getMyRestaurant controller :", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

export const updateMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error in getMyRestaurant controller :", error);
    res.status(500).json({ message: "Error updating restaurant" });
  }
};

export const getMyRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log("Error in getMyRestaurantOrders controller :", error);
    res.status(500).json({ message: "Error fetching  restaurant orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }
    order.status = status;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.log("Error in updateOrderStatus controller :", error);
    res.status(500).json({ message: "unable to update status" });
  }
};

const uploadImage = async (file) => {
  //getting image with the help of multer
  const image = file;
  //converting image buffer to base64 iamge string
  const base64Image = Buffer.from(image.buffer).toString("base64");
  //adding image format and also the base64 image so we can pass dataURi to cloudinary (explaines something about image type of image)
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  //uploading image to cloudinary
  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  return uploadResponse.url;
};

import User from "../models/userModel.js";

export const createCurrentUser = async (req, res) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("Somthing wrong in createCurrentUser controller", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateCurrentUser = async (req, res) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log("Somthing wrong in createCurrentUser controller", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getCurrentLoggedInUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log("Somthing wrong in getCurrentLoggedInUser controller", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

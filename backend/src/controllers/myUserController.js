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

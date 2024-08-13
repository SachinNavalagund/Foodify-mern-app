import mongoose from "mongoose";

export const connectDataBase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Data base has been connected successfully");
  } catch (error) {
    console.log("Somthing went wrong while connection to data base", error);
    process.exit(1);
  }
};

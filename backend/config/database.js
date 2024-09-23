import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path: "../config/.env",
});

mongoose.set("debug", true); 

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/artManagement", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

export default databaseConnection;

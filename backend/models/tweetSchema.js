import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDetails: {
      type: Array,
      default: [],
    },
    image: {
      url: String,
      filename: String,
      // default:
      //   "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      // set: (v) =>
      //   v === ""
      //     ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
      //     : v,
    },
  },
  { timestamps: true }
);
export const Tweet = mongoose.model("Tweet", tweetSchema);

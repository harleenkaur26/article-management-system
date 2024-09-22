import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

// Create a tweet
export const createTweet = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const image = req.file ? req.file.path : null; // Get the file path if an image is uploaded

    // Validate required fields
    if (!title || !description || !id) {
      return res.status(400).json({
        message: "Title, description, and user ID are required.",
        success: false,
      });
    }

    // Find the user by ID
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Create the tweet
    await Tweet.create({
      title,
      description,
      userId: id,
      userDetails: user,
      image,
    });

    // Successful response
    return res.status(201).json({
      message: "Tweet created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error creating tweet:", error);
    return res.status(500).json({
      message: "An error occurred while creating the tweet.",
      success: false,
    });
  }
};

// edit and update route
export const editTweet = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // Validate inputs
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true } // Return the updated tweet and enforce validation
    );

    if (!updatedTweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    return res.status(200).json({
      message: "Tweet updated successfully.",
      updatedTweet, // Return the updated tweet
    });
  } catch (error) {
    console.error("Error updating tweet:", error);
    return res.status(500).json({ message: "Error updating tweet." });
  }
};

// delete route
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// like or dislike route
export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      // dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User disliked your tweet.",
      });
    } else {
      // like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User liked your tweet.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get all tweets route
export const exploreAllTweets = async (req, res) => {
  try {
    // Fetch all tweets from the database, sorted by creation date (newest first)
    const allTweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name username");

    return res.status(200).json({
      success: true,
      tweets: allTweets,
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching tweets.",
    });
  }
};

export const getAllTweets = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the route parameters

  try {
    // Fetch all tweets from the database for the given user ID, sorted by creation date (newest first)
    const allTweets = await Tweet.find({ userId: userId }) // Filter by userId
      .sort({ createdAt: -1 })
      .populate("userId", "name username");

    // If no tweets found, respond accordingly
    if (!allTweets.length) {
      return res.status(404).json({
        success: false,
        message: "No tweets found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      tweets: allTweets,
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching tweets.",
    });
  }
};




// get following tweets route
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

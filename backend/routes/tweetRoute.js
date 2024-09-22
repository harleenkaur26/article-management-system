// import express from "express";
// import {
//   createTweet,
//   deleteTweet,
//   getAllTweets,
//   getFollowingTweets,
//   likeOrDislike,
//   editTweet,
// } from "../controllers/tweetController.js";
// import isAuthenticated from "../config/auth.js";
// import multer from "multer";

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Change this to your desired directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Save file with timestamp
//   },
// });

// const upload = multer({ storage });

// const router = express.Router();

// router
//   .route("/create")
//   .post(isAuthenticated, upload.single("image"), createTweet);

// router.route("/edit/:id").put(isAuthenticated, editTweet);
// router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
// router.route("/like/:id").put(isAuthenticated, likeOrDislike);
// // router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
// router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);
// router.route("/explore").get(isAuthenticated, getAllTweets);

// export default router;

import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
  editTweet,
  exploreAllTweets,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
import multer from "multer";

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route to create a tweet
router
  .route("/create")
  .post(isAuthenticated, upload.single("image"), createTweet);

// Route to edit a tweet
router.route("/edit/:id").put(isAuthenticated, editTweet);

// Route to delete a tweet
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);

// Route to like or dislike a tweet
router.route("/like/:id").put(isAuthenticated, likeOrDislike);

// Route to get all tweets for a specific user
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);

// Route to get tweets from users that the logged-in user follows
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

// Route to explore all tweets 
router.route("/explore").get(isAuthenticated, exploreAllTweets);

export default router;
